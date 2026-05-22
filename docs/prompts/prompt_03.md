# Промпт 03

## Параметры

| Параметр | Значение |
|----------|----------|
| **Agent** | Cursor IDE |
| **Plugins, rules, skills, MCPs** | empty |
| **Context** | предыдущий запрос prompt_02.md |
| **Mode** | agent |
| **Model** | auto (Codex 5.3) |

## Текст промпта

```
в консоле при запуске отображаются ошибки, поправь их:

[backend] node:events:502
[backend]       throw er; // Unhandled 'error' event
[backend]       ^
[backend]
[backend] Error: listen EADDRINUSE: address already in use :::3001
[backend]     at Server.setupListenHandle [as _listen2] (node:net:1908:16)
[backend]     at listenInCluster (node:net:1965:12)
[backend]     at Server.listen (node:net:2067:7)
[backend]     at Function.listen (C:\git\otus\task_1\node_modules\express\lib\application.js:635:24)
[backend]     at <anonymous> (C:\git\otus\task_1\backend\src\index.ts:6:5)
[backend]     at ModuleJob.run (node:internal/modules/esm/module_job:325:25)
[backend]     at async ModuleLoader.import (node:internal/modules/esm/loader:606:24)
[backend]     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:117:5)
[backend] Emitted 'error' event on Server instance at:
[backend]     at emitErrorNT (node:net:1944:8)
[backend]     at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
[backend]   code: 'EADDRINUSE',
[backend]   errno: -4091,
[backend]   syscall: 'listen',
[backend]   address: '::',
[backend]   port: 3001
[backend] }
[backend]
[backend] Node.js v20.20.1
```

## Результат

```
Причина ошибки — порт 3001 был уже занят предыдущим процессом backend (остался после прошлого запуска npm run dev). Новый экземпляр не мог стартовать и падал с EADDRINUSE.

Что сделано
Освобождён порт 3001 — завершён зависший процесс.
Обновлён backend/src/index.ts — ошибка listen обрабатывается явно, в консоль выводится понятное сообщение вместо необработанного Unhandled 'error' event.
Добавлен раздел в docs/README.md — что делать, если порт снова занят.
Если ошибка повторится после npm run dev, в PowerShell:

Get-NetTCPConnection -LocalPort 3001 | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { Stop-Process -Id $_ -Force }
Затем снова npm run dev.
```
