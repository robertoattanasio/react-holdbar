# Stylesheet

`react-holdbar/holdbar.css` draws the bar. No component imports it: import it once in the app.

```ts
import "react-holdbar/holdbar.css";
```

## Custom properties

| Property                   | Default                             |                                           |
| -------------------------- | ----------------------------------- | ----------------------------------------- |
| `--holdbar-height`         | `2px`                               | the height of the bar                     |
| `--holdbar-fill-duration`  | `12s`                               | how long the fill takes to reach 90%      |
| `--holdbar-shine-duration` | `1.6s`                              | how long the shine takes to cross the bar |
| `--holdbar-shine`          | `currentColor` mixed with 45% white | the color of the shine                    |

Set them in CSS on `[data-holdbar]`, or through the `height` and `fillDuration` props.

## The bar

- `[data-holdbar]` is fixed to the top of the viewport, full width, `z-index: 9999`, and ignores the pointer.
- The bar is its `::before`, painted with `currentColor`, growing from the left with `scale`.
- A lighter band, the shine, crosses the bar from left to right while it loads, so it never looks stuck. Set `--holdbar-shine: currentColor` to turn it off.

## Animations

| When        | Animation                                                                                                                                                         |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `loading`   | `holdbar-fill`: from 0 to 90% of the width over `--holdbar-fill-duration`, fast at first then slower, and `holdbar-shine` looping over `--holdbar-shine-duration` |
| `finishing` | `holdbar-finish`: the bar completes to full width in 200ms, stays opaque, then fades out by 450ms                                                                 |

- The bar opens on `[data-holdbar-state="loading"]`, and also on `:root:has([data-holdbar-hold])`, which works without JavaScript, before hydration. Neither applies during `finishing`.
- The end of `holdbar-finish` moves the state on: renaming or removing that animation leaves the bar stuck in `finishing`.

## Reduced motion

With `prefers-reduced-motion: reduce`, `holdbar-fill` and `holdbar-shine` aren't defined: the bar appears at full width without moving, then fades out as usual.

## View transitions

With `detachFromViewTransition`, the bar gets `view-transition-name: holdbar`, and its group and new snapshot have no animation while the old one is hidden. During a view transition the bar stays put instead of crossfading with the page.

## Example

```css
[data-holdbar] {
  --holdbar-height: 3px;
  color: var(--color-accent);
}
```
