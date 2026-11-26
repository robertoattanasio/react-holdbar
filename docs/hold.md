# Holdbar.Hold

Keeps the bar open while it's mounted.

```ts
Holdbar.Hold(props: HoldbarHoldProps): JSX.Element
```

| Prop    | Type     | Default |                                                        |
| ------- | -------- | ------- | ------------------------------------------------------ |
| `delay` | `number` | `0`     | milliseconds to wait before the hold counts, if at all |

Types: `HoldbarHoldProps`.

## Behavior

- Renders an empty, hidden `<span data-holdbar-hold>`.
- On mount it adds a hold, on unmount it removes it. Holds are counted: the bar closes when the last one is gone.
- With `delay`, the hold counts only once the delay has passed. Unmounted earlier, it never counted: a load faster than the delay never shows the bar. Once it counts, the bar starts from zero, as for any hold.
- `data-holdbar-hold` is on the `span` only while the hold counts.
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

While a request runs, showing the bar only if it takes longer than 300ms:

```tsx
{
  isPending && <Holdbar.Hold delay={300} />;
}
```
