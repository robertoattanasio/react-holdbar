# Holdbar.Hold

Keeps the bar open while it's mounted.

```ts
Holdbar.Hold(): JSX.Element
```

It takes no props.

## Behavior

- Renders an empty, hidden `<span data-holdbar-hold>`.
- On mount it adds a hold, on unmount it removes it. Holds are counted: the bar closes when the last one is gone.
- Holds register in a layout effect, so the bar reacts before the browser paints.
- Before hydration, the stylesheet opens the bar by itself as soon as a `[data-holdbar-hold]` is in the page. This covers server-rendered and streamed HTML.
- It can sit anywhere in the tree, inside or outside the `Holdbar`.
- Works from Server Components.

## Example

As a Suspense fallback:

```tsx
<Suspense fallback={<Holdbar.Hold />}>
  <Comments />
</Suspense>
```

While a request runs:

```tsx
{
  isPending && <Holdbar.Hold />;
}
```
