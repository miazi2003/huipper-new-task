import "dotenv/config";
import { createApp } from "./app.js";
import { getHost, getPort } from "./config/environment.js";

const port = getPort();
const host = getHost();

createApp().listen(port, host, () => {
  console.info(`Huipper server listening on http://${host}:${port}`);
});
