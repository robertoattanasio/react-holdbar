# Rules

How react-toploader code is written.

## Files

Components hold the UI, hooks connect them to the store, and the store holds the logic:

```
toploader.css              the bar, at the package root
src/
  components/
    toploader/
      toploader.tsx        the bar, and its Hold part
      toploader_client.tsx the part of the bar that needs the browser
      toploader_hold.tsx   the hold
      type.ts              its props
  hooks/
    use_toploader.ts       reads the state, sets minVisible
    use_toploader_hold.ts  registers a hold while mounted
  store/
    toploader_store.ts     the state machine
    type.ts                the state
  index.ts                 the only barrel
```

Relative imports end in `.js`, and types are imported with `import type`.

## Naming

| what         | convention       | example                 |
| ------------ | ---------------- | ----------------------- |
| folder, file | `snake_case`     | `hooks/use_toploader.ts` |
| component    | `Toploader*`     | `ToploaderClient`       |
| part         | `Toploader.Part` | `Toploader.Hold`        |
| hook         | `useToploader*`  | `useToploaderHold`      |
| props type   | `<Component>Props` | `ToploaderProps`      |
| store        | `UPPER_SNAKE_CASE` | `TOPLOADER_STORE`     |
| attribute    | `data-toploader*` | `data-toploader-state` |

## The store

`TOPLOADER_STORE` lives outside React and holds one state: `idle`, `loading` or `finishing`.

- `hold` counts a hold. From `idle` it starts `loading`; during `finishing` it changes nothing.
- `release` counts one hold less. When none is left, it moves to `finishing` once `minVisible` has passed since `loading` started.
- `settle` runs when the finish animation ends: back to `loading` if a hold arrived in the meantime, `idle` otherwise.
- On the server the store never moves. The server snapshot is `idle`.

## The components

- `toploader.tsx` has no directive: it renders `ToploaderClient` and holds `Toploader.Hold`, so both work from Server Components.
- `ToploaderClient` and `ToploaderHold` are marked `"use client"` and never exported. `Toploader.Hold` is the only way to reach the Hold.
- `ToploaderClient` writes the state to `data-toploader-state` and its props to custom properties. It never decides how anything looks.
- The Hold renders a hidden, empty `span` with `data-toploader-hold`. It takes no props.
- Holds register in layout effects, so the state is applied before the browser paints.

## The stylesheet

- No component imports it. The consumer imports `react-toploader/toploader.css` once.
- The bar is the `::before` of the element, painted with `currentColor`.
- `:root:has([data-toploader-hold])` opens the bar without JavaScript, before hydration and outside React. It never applies during `finishing`.
- `finishing` is an animation, not a transition, so it always starts at full opacity.
- Custom properties have their default as the `var()` fallback, in the one place they are used.
- With reduced motion the fill keyframes are not defined, so the bar shows at full width without moving.
