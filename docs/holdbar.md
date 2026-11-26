# Holdbar

The bar. Mount it once, near the root of the app.

```ts
Holdbar(props: HoldbarProps): JSX.Element
```

| Prop                       | Type                    | Default |                                                                   |
| -------------------------- | ----------------------- | ------- | ----------------------------------------------------------------- |
| `height`                   | `number`                | `2`     | pixels, written to `--holdbar-height`                             |
| `fillDuration`             | `number`                | `12000` | milliseconds the fill takes, written to `--holdbar-fill-duration` |
| `minVisible`               | `number`                | `0`     | milliseconds the bar stays open at least, once it opens           |
| `detachFromViewTransition` | `boolean`               | `false` | keeps the bar out of view transitions                             |
| `...rest`                  | `ComponentProps<"div">` |         | spread on the `<div>`, `ref` included                             |

Types: `HoldbarProps`.

## Data attributes

| Attribute               | Value                                                       |
| ----------------------- | ----------------------------------------------------------- |
| `data-holdbar`          | always present, empty                                       |
| `data-holdbar-state`    | `idle`, `loading` or `finishing`, see [states](./states.md) |
| `data-holdbar-detached` | present when `detachFromViewTransition` is on               |

## Behavior

- Renders a `<div aria-hidden>`. The bar itself is its `::before`, drawn by the [stylesheet](./stylesheet.md).
- The bar is painted with `currentColor`: set `color` on it, with `style` or a class.
- `height` and `fillDuration` only set custom properties. Leaving them out keeps the stylesheet's defaults, or the values set in CSS.
- `style` and `onAnimationEnd` passed as props are kept.
- `ref` reaches the `<div>`, as any other prop in React 19. Read from it, don't write to it: the `data-holdbar-*` attributes and the state belong to the bar.
- The state is global: every `Holdbar` in the page shows the same one. With more than one, the last `minVisible` set wins.
- Works from Server Components: the part that needs the browser is a client component inside it.
- On the server the state is `idle`.

## Example

```tsx
<Holdbar height={3} minVisible={300} className="text-sky-500" detachFromViewTransition />
```
