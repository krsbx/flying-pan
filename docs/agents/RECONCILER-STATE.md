# Reconciler & State

The reconciler diffs widget trees across frames to preserve identity (`stableId`) and dispatch lifecycle hooks. The `StateStore` holds widget-local state by `stableId`. Together they provide React-like semantics under a rebuild-per-frame model.

## Reconciler (`src/flying/reconcile/reconciler/index.ts`)

### Purpose
The user rebuilds a fresh `WidgetDescriptor` tree every frame in `onFrame`. The reconciler's job:
1. Match each new widget to its prev-frame counterpart
2. Preserve `stableId` across the match
3. Dispatch `onMount` / `onUpdate` / `onUnmount` lifecycle hooks
4. Clean up state for unmounted widgets

### Identity short-circuit
```ts
if (next === this.prevTree?.widget) {
  this._changed = false;
  return this.prevTree;
}
```
If the user passes the **same descriptor reference** as last frame (tree is static), reconcile skips all diffing. This is the key optimization for static subtrees — no allocation, no walk, no map rebuild.

### StableId assignment

```ts
stableIdByWidget: Map<WidgetDescriptor, number>  // cleared each pass
nextId: number                                    // 0 reserved for "not reconciled"
```

`reconcileNode(prev, next)`:
- **Type matches prev** → preserve `prev.stableId`. If `prev.widget !== next`, fire `onUpdate`.
- **Type mismatch or new** → unmount prev (if any), assign `nextId++`, fire `onMount`.

`stableIdByWidget` is `.clear()`-ed each pass (not `new Map()`) to avoid GC pressure.

### `getStableId(widget)`
```ts
public getStableId = (widget: WidgetDescriptor): number => {
  if (widget._virtualStableId != null) return widget._virtualStableId;
  return this.stableIdByWidget.get(widget) ?? 0;
};
```
Virtual list items (generated during layout, after reconcile) carry `_virtualStableId` and bypass the map. See [LAYOUT.md](./LAYOUT.md) § Virtualization.

### Key-based matching

When reconciling children, descriptors partition into keyed and unkeyed:

```
prev children:
  partition into prevKeyed: Map<Key, ReconciledNode>
  partition into prevUnkeyed: ReconciledNode[]

for each next child:
  if child.key !== undefined:
    match against prevKeyed.get(key)   // cross-sibling match
    mark key consumed
  else:
    match against prevUnkeyed[cursor++]  // positional match

unmount: prevKeyed entries not consumed + remaining prevUnkeyed
```

`Key = string | number`. Keyed children can be reordered without losing identity/state; unkeyed children match positionally.

### Lifecycle hooks

| Hook | Fires when | Payload |
|---|---|---|
| `onMount` | Widget enters tree (new stableId) | `{ window, widget, stableId }` |
| `onUpdate` | Same type + same stableId but different descriptor ref | `{ window, widget, stableId, prev }` |
| `onUnmount` | Widget leaves tree (no match, or type changed) | `{ window, widget, stableId }` |

`unmountNode` is recursive: fires `onUnmount` on the node, calls `stateStore.destroy(stableId)`, then recurses into children.

### `changed` flag

`reconciler.changed` is a boolean — `true` when the tree was actually re-diffed (descriptor ref changed), `false` on identity short-circuit. Consumed by ScrollDispatcher to know when to clean up orphan offsets.

## StateStore (`src/flying/state/state/index.ts`)

Widget-local state by `stableId`. Two maps:

```ts
store: Map<stableId, any>        // widget-local
namedStore: Map<string, any>     // shared by name (radio groups, etc.)
```

### `stateFor<T>({ stableId, initial })`
- Returns existing state if present
- Otherwise creates from `initial` (value or lazy `() => T`), stores it, returns it
- Lazy init runs at most once per stableId

### `setState<T>({ stableId, value })`
Overwrites widget-local state.

### Named variants
- `stateForByName<T>({ name, initial })`
- `setStateByName<T>({ name, value })`
- `destroyByName(name)`

Used by `RadioGroup` — all radios in a group share state by name, independent of stableId.

### Cleanup
`destroy(stableId)` called by the reconciler on unmount. Prevents state leaks for removed widgets.

## Controlled vs uncontrolled

Stateful widgets (Checkbox, Radio, Toggle, SliderBar, RangeSlider, TextInput) accept either:

**Controlled** — parent owns state:
- Widget receives `value` / `checked` / `selected`
- Widget fires `onChange(next)`; parent updates state
- Widget never reads from StateStore

**Uncontrolled** — widget owns state:
- Widget receives `defaultValue` / `defaultChecked`
- Widget reads/writes `stateStore.stateFor({ stableId, initial: defaultValue })`
- Widget still fires `onChange(next)` for external listeners

### Pattern (Checkbox example)
```ts
onClick(event) {
  if (props.value !== undefined) {
    props.onChange?.(!props.value);        // controlled
    return;
  }
  const current = stateStore.stateFor({     // uncontrolled
    stableId: node.stableId,
    initial: props.defaultValue ?? false,
  });
  stateStore.setState({ stableId: node.stableId, value: !current });
  props.onChange?.(!current);
}
```

Mirrors React's controlled/uncontrolled contract exactly. Sliders use the same pattern with `props.value ?? stateStore.stateFor(...)`.

## ReconciledNode (internal)

```ts
interface ReconciledNode {
  widget: WidgetDescriptor;
  stableId: number;
  children: ReconciledNode[];
}
```

The reconciler returns a `ReconciledNode` tree. This is **not** the same as the `LayoutNode` tree — layout runs separately on the original `WidgetDescriptor` tree and produces `LayoutNode`s with geometry. The reconciled tree exists only to carry stableId assignments and lifecycle state across frames.
