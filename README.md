# react-holdbar

A CSS-native top loading bar for React: mount a `Holdbar.Hold` wherever something is loading, and the bar stays open until the last one is gone.

Package: [npmjs.com/package/react-holdbar](https://www.npmjs.com/package/react-holdbar)

Documentation: [dev.robertoattanasio.com/react-holdbar](https://dev.robertoattanasio.com/react-holdbar)

## Install

```sh
npm install react-holdbar
```

## Usage

Import the stylesheet once, in your entry stylesheet or entry module:

```css
@import "react-holdbar/holdbar.css";
```

Render the bar once, near the root:

```tsx
import { Holdbar } from "react-holdbar";

<Holdbar className="text-primary" height={3}>
  {isNavigating && <Holdbar.Hold />}
</Holdbar>;
```

Anything else that is loading mounts its own Hold, wherever it lives in the tree:

```tsx
{
  mutation.isPending && <Holdbar.Hold />;
}

<Suspense fallback={<Holdbar.Hold />}>
  <Comments />
</Suspense>;
```

## How it works

There is no `start()` and no `done()`. The bar is open while at least one `Holdbar.Hold` is mounted, and it finishes when the last one goes. Two loads that overlap don't need to know about each other.

The check is plain CSS: `:root:has([data-holdbar-hold])`. A Hold in a Suspense fallback ends up in the server's HTML, so with streaming SSR the bar is already moving before hydration.

After hydration a small store takes over the timing: it keeps the bar filling for at least `minVisible`, and it plays the finish to the end, at full colour, however short the load was. A Hold that arrives during the finish waits for it, then the bar starts again.

## Props

| prop                       | default | what it does                                                    |
| -------------------------- | ------- | --------------------------------------------------------------- |
| `height`                   | `2`     | the thickness of the bar, in pixels                             |
| `fillDuration`             | `12000` | milliseconds to fill towards 90%                                |
| `minVisible`               | `0`     | milliseconds the bar keeps filling at least, before it finishes |
| `detachFromViewTransition` | `false` | keeps the bar out of the page's view transition                 |

Every other prop goes to the `div`. The bar is painted with `currentColor`, so `color` sets its colour. For anything the props don't cover, style the `::before`, which is the bar itself, with plain CSS after the library's import. The stylesheet isn't in a cascade layer, so Tailwind utilities can't override it.

`Holdbar.Hold` takes no props.

## Server Components

`Holdbar` and `Holdbar.Hold` can both be rendered from a Server Component, for example the Hold as a Suspense fallback.

## Without React

The stylesheet works on its own, with the same markup the components render:

```html
<div data-holdbar aria-hidden="true"></div>

<span data-holdbar-hold hidden></span>
```

The bar is open while an element with `data-holdbar-hold` is on the page. The timing needs the component: `minVisible`, and the finish that always plays to the end at full colour.

## License

MIT
