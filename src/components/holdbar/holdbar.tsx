import { HoldbarHold } from "./holdbar_hold.js";
import { HoldbarClient } from "./holdbar_client.js";

import type { HoldbarProps } from "./type.js";

export const Holdbar = (props: HoldbarProps) => <HoldbarClient {...props} />;

Holdbar.Hold = HoldbarHold;
