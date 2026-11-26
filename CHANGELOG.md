# react-holdbar

## 1.0.0

### Major Changes

- First stable release. `Holdbar.Hold` takes a `delay`: the hold counts only after it, so a load faster than the delay never shows the bar. The bar starts from zero instead of 8%, and a shine crosses it while it loads, set with `--holdbar-shine` and `--holdbar-shine-duration`.
