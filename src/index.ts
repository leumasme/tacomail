export * from "./routes"
export * as types from "./types"

import { TacomailClient } from "./classes";
import { defaultServer } from "./routes";
export { TacomailClient };
export default new TacomailClient(defaultServer);