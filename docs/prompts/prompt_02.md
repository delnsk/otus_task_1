# Промпт 02

## Параметры

| Параметр | Значение |
|----------|----------|
| **Agent** | Cursor IDE |
| **Plugins, rules, skills, MCPs** | empty |
| **Context** | empty |
| **Mode** | agent |
| **Model** | auto (Codex 5.3) |

## Текст промпта

```
Выполни шаг за шагом план @docs/plan.md
```

## Результат

```
Реализация по плану завершена. Кратко, что сделано:

Структура
Monorepo с workspaces: backend/ (Express + TypeScript, SOLID-слои) и frontend/ (React + Vite + shadcn/ui).

Backend
GET /api/questions — вопросы из backend/data/questions.json (5 вопросов, типы open, single, multiple на тему ИИ и профессии программиста)
POST /api/answers — валидация, сохранение в backend/answers/answer-NNN.json со снимком вопросов
Порт 3001

Frontend
Загрузка анкеты, поля по типу вопроса (textarea / radio / checkbox)
Синяя минималистичная тема, анимация fade-in-up
Экран «Спасибо!» и кнопка «Пройти снова»
Proxy /api → backend в dev

Запуск
.\scripts\setup-and-run.ps1
или:

npm install
npm run dev
Frontend: http://localhost:5173
Backend: http://localhost:3001

Документация
README.md — описание и инструкция
docs/implementation_plan.md — план реализации
Сборка (npm run build) и API-тест прошли успешно; создан файл backend/answers/answer-001.json (при коммите он не попадёт в git — исключён в .gitignore).
```
