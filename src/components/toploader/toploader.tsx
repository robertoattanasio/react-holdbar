import { ToploaderHold } from "./toploader_hold.js";
import { ToploaderClient } from "./toploader_client.js";

import type { ToploaderProps } from "./type.js";

export const Toploader = (props: ToploaderProps) => <ToploaderClient {...props} />;

Toploader.Hold = ToploaderHold;
