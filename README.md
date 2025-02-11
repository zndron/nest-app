## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development mode
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Stop the project

```bash
ctrl + c
```


### Структура Todo List

1. **Користувачі (Users):**
   - Унікальний ідентифікатор (ID).
   - Ім'я користувача.
   - Електронна пошта.
   - Список проєктів, до яких вони мають доступ.

2. **Проєкти (Projects):**
   - Унікальний ідентифікатор (ID).
   - Назва проєкту.
   - Опис.
   - Відповідальні користувачі.
   - Список завдань.

3. **Завдання (Tasks):**
   - Унікальний ідентифікатор (ID).
   - Назва завдання.
   - Опис.
   - Статус (наприклад: "Виконано", "В процесі", "Очікує").
   - Дата створення/завершення.
   - Пріоритет.
   - Відповідальний користувач.

### Приклад реалізації (JSON)
```json
{
  "users": [
    {
      "id": 1,
      "name": "Іван Петренко",
      "email": "ivan.petrenko@example.com",
      "projects": [1, 2]
    },
    {
      "id": 2,
      "name": "Олена Іванова",
      "email": "olena.ivanova@example.com",
      "projects": [1]
    }
  ],
  "projects": [
    {
      "id": 1,
      "name": "Проєкт 1",
      "description": "Перший проєкт",
      "users": [1, 2],
      "tasks": [1, 2]
    },
    {
      "id": 2,
      "name": "Проєкт 2",
      "description": "Другий проєкт",
      "users": [1],
      "tasks": [3]
    }
  ],
  "tasks": [
    {
      "id": 1,
      "name": "Написати план",
      "description": "Підготувати початковий план проєкту.",
      "status": "Очікує",
      "created_at": "2025-01-17",
      "due_date": "2025-01-20",
      "priority": "Високий",
      "assigned_user": 1
    },
    {
      "id": 2,
      "name": "Рев'ю плану",
      "description": "Перевірити підготовлений план.",
      "status": "В процесі",
      "created_at": "2025-01-18",
      "due_date": "2025-01-22",
      "priority": "Середній",
      "assigned_user": 2
    },
    {
      "id": 3,
      "name": "Написати документацію",
      "description": "Створити основну документацію для другого проєкту.",
      "status": "Очікує",
      "created_at": "2025-01-17",
      "due_date": "2025-01-25",
      "priority": "Низький",
      "assigned_user": 1
    }
  ]
}
```

### Основні функції
1. **Додавання користувача**:
   - Створення нового об'єкта користувача.
   - Призначення проєктів.

2. **Створення проєкту**:
   - Додавання нових проєктів.
   - Призначення користувачів та завдань.

3. **Додавання завдання**:
   - Прив'язка завдання до проєкту та користувача.

4. **Оновлення статусу**:
   - Зміна статусу завдання.

5. **Фільтрація**:
   - Завдання за користувачем, проєктом, статусом або пріоритетом.


## Typeorm

```bash
# generate migration
$ npm run migration:generate --  src/database/migrations/NewMigrations

# run migration
$ npm run migration:run

# schema log
$ typeorm schema:log -d dist/db/data-source.js
```


