# react-holdbar

A top loading bar for React that lives mostly in CSS: mount a `Holdbar.Hold` wherever something is loading, and the bar stays open until the last one is gone. Public package on npm.

## Docs

- [README.md](./README.md): install, links to the docs.
- [docs/](./docs/): [holdbar.md](./docs/holdbar.md), [hold.md](./docs/hold.md), [states.md](./docs/states.md), [stylesheet.md](./docs/stylesheet.md), plus [scripts.md](./docs/scripts.md) and [release.md](./docs/release.md).

Read the relevant doc before changing the package. When behavior, a prop, a state or the stylesheet changes, update its doc in the same change.

## Structure

```
holdbar.css                 the bar, at the package root
src/
  index.ts                  the only barrel
  components/holdbar/
    holdbar.tsx             the bar, and its Hold part
    holdbar-client.tsx      the part of the bar that needs the browser
    holdbar-hold.tsx        the hold
    type.ts                 the props
  hooks/
    use-holdbar.ts          reads the state, sets minVisible
    use-holdbar-hold.ts     registers a hold while mounted
  store/
    holdbar-store.ts        the state machine
    type.ts                 the state
```

Components hold the UI, hooks connect them to the store, the store holds the logic.

## Naming

| What         | Convention         | Example                |
| ------------ | ------------------ | ---------------------- |
| folder, file | kebab-case         | `hooks/use-holdbar.ts` |
| component    | `Holdbar*`         | `HoldbarClient`        |
| part         | `Holdbar.Part`     | `Holdbar.Hold`         |
| hook         | `useHoldbar*`      | `useHoldbarHold`       |
| props type   | `<Component>Props` | `HoldbarProps`         |
| store        | UPPER_SNAKE_CASE   | `HOLDBAR_STORE`        |
| attribute    | `data-holdbar*`    | `data-holdbar-state`   |

## Store

- `HOLDBAR_STORE` lives outside React and holds one state: `idle`, `loading` or `finishing`.
- `hold` counts a hold. From `idle` it starts `loading`, during `finishing` it changes nothing.
- `release` counts one hold less. When none is left, it moves to `finishing` once `minVisible` has passed since `loading` started.
- `settle` runs when `holdbar-finish` ends: back to `loading` if a hold is mounted, `idle` otherwise.
- The server snapshot is `idle`.

## Components

- `holdbar.tsx` has no directive: it renders `HoldbarClient` and carries `Holdbar.Hold`, so both work from Server Components.
- `HoldbarClient` and `HoldbarHold` are `"use client"` and never exported. `Holdbar.Hold` is the only way to reach the Hold.
- `HoldbarClient` writes the state to `data-holdbar-state` and its props to custom properties. It never decides how anything looks.
- The Hold renders a hidden, empty `span` with `data-holdbar-hold`. Its only prop is `delay`: the hold counts, and the attribute appears, only once the delay has passed; unmounted earlier, it never counted.
- Holds register in layout effects.

## Stylesheet

- No component imports it: the consumer imports `react-holdbar/holdbar.css` once.
- The bar is the `::before` of `[data-holdbar]`, painted with `currentColor`, with a shine crossing it while it loads (`--holdbar-shine`, `--holdbar-shine-duration`).
- `:root:has([data-holdbar-hold])` opens the bar without JavaScript. It never applies during `finishing`.
- `finishing` is an animation, not a transition, so it always starts at full opacity. Its `animationend` drives `settle`: the name `holdbar-finish` is part of the contract with `HoldbarClient`.
- Custom properties have their default as the `var()` fallback, in the one place they're used.
- With reduced motion the fill and shine keyframes aren't defined.

## Conventions

- Relative imports end in `.js`, types are imported with `import type`.
- React and React DOM are peer dependencies. No other dependencies.
- No comments in the code unless asked.
