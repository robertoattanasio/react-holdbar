# react-holdbar

`react-holdbar` adds a loading bar to the top of your React app. Mount `Holdbar.Hold` while something is loading, wherever it makes sense in your component tree. The bar opens when the first hold appears and closes after the last one disappears. It can also appear before hydration: the stylesheet detects holds in the page without waiting for JavaScript.

Package: [npmjs.com/package/react-holdbar](https://www.npmjs.com/package/react-holdbar)

Documentation: [dev.robertoattanasio.com/react-holdbar](https://dev.robertoattanasio.com/react-holdbar)

## Installation

```sh
npm install react-holdbar
```

React 19 and React DOM 19 are required as peer dependencies.

Import the stylesheet once in your app's entry point or main stylesheet:

```ts
import "react-holdbar/holdbar.css";
```

Then mount the bar near the app root and set its color:

```tsx
import { Holdbar } from "react-holdbar";

<Holdbar style={{ color: "royalblue" }} />;
```

## API

The package includes the bar, the hold that keeps it open, and the stylesheet that draws it. The guides explain each part in more detail:

- [Holdbar](./docs/holdbar.md)
- [Holdbar.Hold](./docs/hold.md)
- [States](./docs/states.md): how the bar moves from one state to the next
- [Stylesheet](./docs/stylesheet.md): custom properties, animations, reduced motion, view transitions

## Scripts

For the available project scripts and what they do, see [docs/scripts.md](./docs/scripts.md).

## License

[MIT](./LICENSE)
