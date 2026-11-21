# States

The bar is in one state at a time, written to `data-holdbar-state`.

| State       | The bar                                 |
| ----------- | --------------------------------------- |
| `idle`      | hidden                                  |
| `loading`   | visible, filling slowly up to 90%       |
| `finishing` | completes to full width, then fades out |

## Transitions

| From        | Event                                                                      | To          |
| ----------- | -------------------------------------------------------------------------- | ----------- |
| `idle`      | the first hold mounts                                                      | `loading`   |
| `loading`   | the last hold unmounts and `minVisible` has passed since `loading` started | `finishing` |
| `finishing` | the finish animation ends, and no hold is mounted                          | `idle`      |
| `finishing` | the finish animation ends, and a hold is mounted                           | `loading`   |

## Behavior

- A hold mounted during `finishing` doesn't interrupt it: the bar finishes, then opens again.
- A hold mounted before the bar reaches `finishing` cancels the pending finish.
- The state lives outside React, in one store for the whole page.
