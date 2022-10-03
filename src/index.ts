export * from "./routes"
export * as types from "./types"

import { TacomailClient } from "./classes";
export { TacomailClient };
export default new TacomailClient();