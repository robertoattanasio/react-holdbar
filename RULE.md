# Rules

How react-holdbar code is written.

## Files

Components hold the UI, hooks connect them to the store, and the store holds the logic:

```
holdbar.css               the bar, at the package root
src/
  components/
    holdbar/
      holdbar.tsx         the bar, and its Hold part
      holdbar_client.tsx  the part of the bar that needs the browser
      holdbar_hold.tsx    the hold
      type.ts             its props
  hooks/
    use_holdbar.ts        reads the state, sets minVisible
    use_holdbar_hold.ts   registers a hold while mounted
  store/
    holdbar_store.ts      the state machine
    type.ts               the state
  index.ts                the only barrel
```

Relative imports end in `.js`, and types are imported with `import type`.

## Naming

| what         | convention         | example                |
| ------------ | ------------------ | ---------------------- |
| folder, file | `snake_case`       | `hooks/use_holdbar.ts` |
| component    | `Holdbar*`         | `HoldbarClient`        |
| part         | `Holdbar.Part`     | `Holdbar.Hold`         |
| hook         | `useHoldbar*`      | `useHoldbarHold`       |
| props type   | `<Component>Props` | `HoldbarProps`         |
| store        | `UPPER_SNAKE_CASE` | `HOLDBAR_STORE`        |
| attribute    | `data-holdbar*`    | `data-holdbar-state`   |

## The store

`HOLDBAR_STORE` lives outside React and holds one state: `idle`, `loading` or `finishing`.

- `hold` counts a hold. From `idle` it starts `loading`; during `finishing` it changes nothing.
- `release` counts one hold less. When none is left, it moves to `finishing` once `minVisible` has passed since `loading` started.
- `settle` runs when the finish animation ends: back to `loading` if a hold arrived in the meantime, `idle` otherwise.
- On the server the store never moves. The server snapshot is `idle`.

## The components

- `holdbar.tsx` has no directive: it renders `HoldbarClient` and holds `Holdbar.Hold`, so both work from Server Components.
- `HoldbarClient` and `HoldbarHold` are marked `"use client"` and never exported. `Holdbar.Hold` is the only way to reach the Hold.
- `HoldbarClient` writes the state to `data-holdbar-state` and its props to custom properties. It never decides how anything looks.
- The Hold renders a hidden, empty `span` with `data-holdbar-hold`. It takes no props.
- Holds register in layout effects, so the state is applied before the browser paints.

## The stylesheet

- No component imports it. The consumer imports `react-holdbar/holdbar.css` once.
- The bar is the `::before` of the element, painted with `currentColor`.
- `:root:has([data-holdbar-hold])` opens the bar without JavaScript, before hydration and outside React. It never applies during `finishing`.
- `finishing` is an animation, not a transition, so it always starts at full opacity.
- Custom properties have their default as the `var()` fallback, in the one place they are used.
- With reduced motion the fill keyframes are not defined, so the bar shows at full width without moving.
