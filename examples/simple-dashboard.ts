import type { App, Window } from '@flying';
import {
  Button,
  Checkbox,
  CircularProgress,
  Flex,
  Label,
  List,
  Overflow,
  ProgressBar,
  SliderBar,
  TextInput,
  Toggle,
  View,
} from '@flying/widget';

// ---------------------------------------------------------------------------
// Shared state — read by both window builders, mutated by event handlers
//
// NOTE: module-level state is re-initialized on every hot reload. See the dev
// runner (`src/bin/develop/index.ts`) for the reload contract.
// ---------------------------------------------------------------------------

const state = {
  sliderValue: 50,
  toggleOn: false,
  checkboxChecked: false,
  textInputValue: '',
  detailsWindow: null as Window | null,
};

// ---------------------------------------------------------------------------
// Details window lifecycle
// ---------------------------------------------------------------------------

function openDetails(app: App) {
  if (state.detailsWindow) return;

  const root = app.root;
  const win = app.createWindow({
    width: 400,
    height: 500,
    title: 'Details',
    backgroundColor: '#16213e',
  });

  win.position = {
    x: root.position.x + 820,
    y: root.position.y,
  };

  state.detailsWindow = win;
}

function closeDetails(app: App) {
  if (!state.detailsWindow) return;
  app.destroyWindow(state.detailsWindow);
  state.detailsWindow = null;
}

// ---------------------------------------------------------------------------
// onReload — runs once on initial load and once after each successful reload.
// Use it for setup that needs `app`. Return a cleanup fn to run before the
// next reload's onReload.
// ---------------------------------------------------------------------------

export const onReload = (app: App) => {
  if (app.activeWindow) {
    app.activeWindow.position = { x: 100, y: 100 };
  }

  const onDestroyed = (win: Window) => {
    if (win === state.detailsWindow) {
      state.detailsWindow = null;
    }
  };

  app.manager.window.on('destroyed', onDestroyed);

  return () => {
    console.log('[dev] onReload cleanup');

    app.manager.window.off('destroyed', onDestroyed);
  };
};

// ---------------------------------------------------------------------------
// Widget builders
// ---------------------------------------------------------------------------

const ACCENT = '#e94560';
const SURFACE = '#0f3460';
const SURFACE_HOVER = '#1a4a7a';
const TEXT = '#ffffff';
const MUTED = '#888888';
const DIVIDER = '#333333';

function divider() {
  return View({
    style: {
      width: '100%',
      height: 1,
      backgroundColor: DIVIDER,
      margin: 8,
    },
  });
}

function sectionTitle(text: string) {
  return Label({
    text,
    font: 'default',
    style: { color: ACCENT, fontSize: 22, width: '100%' },
  });
}

function buildDashboard(app: App): ReturnType<typeof Flex> {
  const detailsOpen = state.detailsWindow !== null;

  return Flex({
    direction: 'column',
    gap: 8,
    style: {
      padding: 16,
      width: '100%',
      height: '100%',
      overflow: Overflow.Scroll,
    },
    children: [
      Label({
        text: 'flying-pan Dashboard',
        font: 'default',
        style: { color: ACCENT, fontSize: 28, width: '100%' },
      }),

      Label({
        text: 'Multi-window demo — open a second window below.',
        font: 'default',
        style: { color: MUTED, fontSize: 16, width: '100%' },
      }),

      // Multi-window --------------------------------------------------------
      divider(),
      sectionTitle('Multi-Window'),

      Button({
        children: [
          Label({
            font: 'default',
            text: detailsOpen
              ? 'Details window is open'
              : 'Open Details Window',
            style: { color: TEXT, textAlign: 'center', width: '100%' },
          }),
        ],
        style: {
          width: '100%',
          height: 40,
          backgroundColor: SURFACE,
          borderRadius: 8,
          focusable: true,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: detailsOpen ? 0.5 : 1,
          _hover: { backgroundColor: SURFACE_HOVER },
          _active: { backgroundColor: ACCENT },
          transition: { property: 'backgroundColor', duration: 200 },
        },
        onClick() {
          openDetails(app);
        },
      }),

      // Controls ------------------------------------------------------------
      divider(),
      sectionTitle('Controls'),

      SliderBar({
        defaultValue: state.sliderValue,
        min: 0,
        max: 100,
        step: 1,
        orientation: 'horizontal',
        onChange: (value) => {
          state.sliderValue = value;
        },
        font: 'default',
        colorStops: [
          { at: 0, color: ACCENT },
          { at: 50, color: '#fca5a5' },
          { at: 100, color: '#ffffff' },
        ],
      }),

      TextInput({
        defaultValue: state.textInputValue,
        placeholder: 'Type something...',
        onChange: (text) => {
          state.textInputValue = text;
        },
        font: 'default',
        style: {
          fontSize: 20,
          width: '100%',
          height: 48,
          backgroundColor: SURFACE,
          borderColor: ACCENT,
          borderWidth: 2,
          borderRadius: 4,
          color: TEXT,
          placeholderColor: '#555555',
          padding: 8,
          overflow: Overflow.Hidden,
          _focus: { borderColor: 'white' },
          transition: { property: 'borderColor', duration: 200 },
        },
      }),

      Flex({
        direction: 'row',
        gap: 16,
        style: { width: '100%', alignItems: 'center' },
        children: [
          Checkbox({
            defaultValue: state.checkboxChecked,
            onChange: (value) => {
              state.checkboxChecked = value;
            },
          }),
          Label({
            text: 'Checkbox',
            font: 'default',
            style: { color: TEXT, fontSize: 18 },
          }),
        ],
      }),

      Flex({
        direction: 'row',
        gap: 16,
        style: { width: '100%', alignItems: 'center' },
        children: [
          Toggle({
            defaultValue: state.toggleOn,
            onChange: (value) => {
              state.toggleOn = value;
            },
          }),
          Label({
            text: 'Toggle',
            font: 'default',
            style: { color: TEXT, fontSize: 18 },
          }),
        ],
      }),

      // Visuals -------------------------------------------------------------
      divider(),
      sectionTitle('Visuals'),

      Label({
        text: 'Indeterminate Progress (animated)',
        font: 'default',
        style: { color: MUTED, fontSize: 14, width: '100%' },
      }),

      ProgressBar({
        min: 0,
        max: 100,
        font: 'default',
        type: 'indeterminate',
      }),

      CircularProgress({
        style: { backgroundColor: 'transparent' },
        fillStyle: {},
        font: 'default',
        min: 0,
        max: 100,
        value: state.sliderValue,
        thickness: 0.15,
        label: `${state.sliderValue}%`,
        labelStyle: { textAlign: 'center' },
      }),

      // Virtual List --------------------------------------------------------
      divider(),
      sectionTitle('Virtual List (10,000 items)'),

      List({
        itemCount: 10000,
        itemSize: 36,
        overscan: 5,
        orientation: 'vertical',
        renderItem: (i) =>
          Label({
            text: `List item ${i + 1}`,
            font: 'default',
            style: {
              color: TEXT,
              fontSize: 18,
              width: '100%',
              height: 36,
              padding: 8,
              _hover: { backgroundColor: '#16213e' },
              transition: { property: 'backgroundColor', duration: 150 },
            },
          }),
        style: {
          width: '100%',
          height: 70,
          overflow: Overflow.Scroll,
        },
      }),

      // Virtual List --------------------------------------------------------
      divider(),
      sectionTitle('Virtual List (10,000 items)'),

      List({
        itemCount: 10000,
        itemSize: 250,
        overscan: 5,
        orientation: 'horizontal',
        renderItem: (i) =>
          Label({
            text: `List item ${i + 1}`,
            font: 'default',
            style: {
              color: TEXT,
              fontSize: 18,
              width: '100%',
              height: 36,
              padding: 8,
              _hover: { backgroundColor: '#16213e' },
              transition: { property: 'backgroundColor', duration: 150 },
            },
          }),
        style: { height: 70 },
      }),
    ],
  });
}

function buildDetails(app: App, win: Window): ReturnType<typeof Flex> {
  const pos = win.position;
  const size = win.size;
  const inputDisplay = state.textInputValue || '(empty)';

  return Flex({
    direction: 'column',
    gap: 12,
    style: {
      padding: 16,
      width: '100%',
      height: '100%',
    },
    children: [
      Flex({
        direction: 'row',
        gap: 8,
        style: { width: '100%', alignItems: 'center' },
        children: [
          Label({
            text: 'Details',
            font: 'default',
            style: { color: ACCENT, fontSize: 24 },
          }),
          View({ style: { flex: 1 } }),
          Button({
            children: [
              Label({
                font: 'default',
                text: 'Close',
                style: { color: TEXT, textAlign: 'center' },
              }),
            ],
            style: {
              width: 80,
              height: 32,
              backgroundColor: SURFACE,
              borderRadius: 6,
              focusable: true,
              alignItems: 'center',
              justifyContent: 'center',
              _hover: { backgroundColor: SURFACE_HOVER },
              _active: { backgroundColor: ACCENT },
              transition: { property: 'backgroundColor', duration: 150 },
            },
            onClick() {
              closeDetails(app);
            },
          }),
        ],
      }),

      divider(),

      // Live preview of shared state
      sectionTitle('Live State'),

      CircularProgress({
        style: { backgroundColor: 'transparent' },
        fillStyle: {},
        font: 'default',
        min: 0,
        max: 100,
        value: state.sliderValue,
        thickness: 0.15,
        label: `${state.sliderValue}%`,
        labelStyle: { textAlign: 'center' },
      }),

      Label({
        text: `Text: ${inputDisplay}`,
        font: 'default',
        style: { color: TEXT, fontSize: 16, width: '100%' },
      }),

      Label({
        text: `Checkbox: ${state.checkboxChecked ? 'on' : 'off'}`,
        font: 'default',
        style: { color: TEXT, fontSize: 16, width: '100%' },
      }),

      Label({
        text: `Toggle: ${state.toggleOn ? 'on' : 'off'}`,
        font: 'default',
        style: { color: TEXT, fontSize: 16, width: '100%' },
      }),

      divider(),

      // Window info
      sectionTitle('Window Info'),

      Label({
        text: `Position: ${pos.x.toFixed(0)}, ${pos.y.toFixed(0)}`,
        font: 'default',
        style: { color: MUTED, fontSize: 14, width: '100%' },
      }),

      Label({
        text: `Size: ${size.width} × ${size.height}`,
        font: 'default',
        style: { color: MUTED, fontSize: 14, width: '100%' },
      }),
    ],
  });
}

// ---------------------------------------------------------------------------
// Default export — the per-frame body. Injected into App.onFrame by the dev
// runner. Rebuilt and swapped on every reload.
// ---------------------------------------------------------------------------

export default function (app: App) {
  app.root.widget = buildDashboard(app);

  if (state.detailsWindow) {
    state.detailsWindow.widget = buildDetails(app, state.detailsWindow);
  }
}
