import type { Server } from "node:http";
import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3001);
const app = createApp();

function onListenError(error: NodeJS.ErrnoException, server: Server): void {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Порт ${port} уже занят. Завершите предыдущий процесс backend (например: npx kill-port ${port}) или запустите с другим портом: PORT=3002 npm run dev -w backend`,
    );
    process.exit(1);
  }

  console.error("Ошибка запуска сервера:", error);
  server.close();
  process.exit(1);
}

const server = app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});

server.on("error", (error: NodeJS.ErrnoException) => {
  onListenError(error, server);
});
