import { HoldbarHold } from "./holdbar-hold.js";
import { HoldbarClient } from "./holdbar-client.js";

import type { HoldbarProps } from "./type.js";

export const Holdbar = (props: HoldbarProps) => <HoldbarClient {...props} />;

Holdbar.Hold = HoldbarHold;
