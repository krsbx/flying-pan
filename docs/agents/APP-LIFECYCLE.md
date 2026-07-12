# App Lifecycle & Window Management

## App class (`src/flying/app/app/index.ts`)

Entry point. Created with `AppConfig`, run with `await app.run()`.

### AppConfig (`src/flying/app/app/types.ts`)

```ts
{
  width, height, title:     // window dimensions + title
  libPath: string           // path to libglfw .dylib
  backgroundColor?: string  // root window bg
  fonts: FontConfig[]       // font atlas configs
  audio?: AudioManagerOptions | null
  texture?: string | null   // path to stb_image .dylib
  vsync?: boolean           // default false
}
```

### Key members

- `app.root` — the root `Window` (always alive; app stops if destroyed)
- `app.activeWindow` — currently focused window (GL context target)
- `app.manager` — `AppManager` holding all subsystems
- `app.renderer` — `Renderer` instance
- `app.gl` — `GLFW` instance
- `app.onFrame(fn)` — register per-frame callback (user rebuilds widget trees here)
- `app.createWindow(options)` — create additional windows (shares GL context with existing)
- `app.destroyWindow(win)` — destroy a window
- `app.run()` — start the frame loop (async, blocks until root window closes)
- `app.close()` — teardown: destroy all windows, fonts, audio, texture, terminate GLFW

### AppManager (`src/flying/app/app/manager.ts`)

Owns and wires all subsystems:

```
AppManager
  ├── window: WindowManager
  ├── monitor: MonitorManager
  ├── animation: AnimationManager
  ├── input: InputManager
  ├── font: FontManager
  ├── interaction: InteractionManager
  │     ├── pointer: PointerDispatcher
  │     ├── focus: FocusDispatcher
  │     └── scroll: ScrollDispatcher
  ├── audio: AudioManager | null
  ├── texture: TextureManager | null
  ├── reconciler: Reconciler
  ├── stateStore: StateStore
  └── paintContext: PaintContext     ← threaded through layout + paint
```

`paintContext` fields: `fontManager`, `interactionManager`, `animationManager`, `textureManager`, `getStableId`, `stateStore`, `layoutIndex: Map<number, LayoutNode>`, `focusableNodes: LayoutNode[]`.

## Run loop

```
while (running) {
  if (activeWindow) {
    clear(window, bgColor)
    if (window.widget) {
      reconciler.reconcile(window, widget)
      animation.tick()
      ctx.layoutIndex.clear()
      ctx.focusableNodes.length = 0
      layout = layoutFlex(widget, 0,0, width, height, ctx)
      interaction.dispatch(layout, layoutIndex, focusableNodes, ...)
      paint(window, layout, ctx)
    }
  }
  onFrame?.(app)              // user sets window.widget here
  if (activeWindow) flush(activeWindow)
  input.update()              // swap double-buffered input
  glfwPollEvents()
  window.cleanUp()            // destroy should-close windows
  await yield()               // setImmediate — prevents blocking JS event loop
  if (window.isEmpty) break
}
```

**Frame budget (~16ms)**: clear → reconcile → animation.tick → layout → dispatch → paint → onFrame → flush → input.update → pollEvents → cleanUp → yield.

The `yield()` (`new Promise(setImmediate)`) is critical — without it the while loop blocks timers, microtasks, and async work. GLFW/OpenGL/input are main-thread-affined on macOS.

## Window management (`src/flying/app/window/`)

### Window

- Properties: `title`, `backgroundColor`, `widget` (the root `WidgetDescriptor`), `size`, `position`, `mousePosition`, `frameBuffer`, `contentScale`, `isFocused`, `isHovered`, `isMaximized`, `isMinimized`
- `widget` is read each frame — user reassigns in `onFrame` to update the UI
- Event system: type-safe callbacks for 17 event types (resize, close, focus, key, char, mouse button, scroll, cursor, etc.)

### WindowManager

- `create(options)` — creates window, auto-focuses, shares GL context with existing windows (textures/buffers available across windows)
- `destroy(window)` — cleanup + event trigger
- `setActive(window)` — switches GL context
- `all: Map<id, Window>` — registry
- `active: Window | null` — currently active window
- Events: `WindowManagerEvent.Created`, `.Destroyed`, `.ActiveChanged`
- `cleanUp()` — called per frame; destroys windows with `glfwWindowShouldClose` flag

### Multi-window pattern

```ts
const win = app.createWindow({ width, height, title, backgroundColor });
win.position = { x: root.position.x + offset, y: root.position.y };

// Clean up reference if user closes via OS
app.manager.window.on(WindowManagerEvent.Destroyed, (w) => {
  if (w === myWindow) myWindow = null;
});

// Per-frame widget sync
app.onFrame(() => {
  app.root.widget = buildRoot();
  if (myWindow) myWindow.widget = buildSecondary(myWindow);
});
```
