<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Вступ в NestJS

Nest (NestJS) - це основа для створення ефективних, масштабованих серверних додатків Node.js. Він використовує прогресивний JavaScript та повністю підтримує TypeScript (але все ще дозволяє розробникам кодувати чистий JavaScript) і поєднує елементи ООП (об'єктно-орієнтоване програмування), ФП (функціональне програмування) та ФРП (функціональне реактивне програмування).

Під капотом Nest використовує надійні фреймворки HTTP Server, такі як Express (за замовчуванням), і за бажанням може бути налаштований на використання Fastify!

Nest забезпечує рівень абстракції над цими загальними фреймворками Node.js (Express / Fastify), але також надає їх API безпосередньо розробнику. Це дає розробникам свободу використовувати безліч сторонніх модулів, доступних для базової платформи.

Nest надає готову архітектуру додатків, яка дозволяє розробникам та командам створювати високотестовані, масштабовані, вільно пов'язані та легко підтримувані програми.

## Встановлення

Для початку ви можете або створити проект за допомогою Nest CLI, або клонувати початковий проект (обидва результати матимуть однаковий результат).

Щоб побудувати проект за допомогою Nest CLI, виконайте такі команди. Це створить новий каталог проекту та заповнить каталог початковими основними файлами Nest та допоміжними модулями, створивши звичайну базову структуру для вашого проекту. Створення нового проекту за допомогою Nest CLI рекомендується для початківців користувачів.

```bash
$ npm i -g @nestjs/cli
$ nest new project-name
```

## Альтернатива

Також можна встановити початковий проект TypeScript за допомогою Git:

```bash
$ git clone https://github.com/nestjs/typescript-starter.git project
$ cd project
$ npm install
$ npm run start
```

Ви також можете вручну створити новий проект з нуля, встановивши ядро та інші файли за допомогою npm (або yarn). У цьому випадку, звичайно, ви самі будете відповідати за створення шаблонних файлів проекту.

```bash 
$ npm i --save @nestjs/core @nestjs/common rxjs reflect-metadata
```

# Створення нового проекту

Налаштування нового проекту досить просто за допомогою Nest CLI. Після встановлення npm ви можете створити новий проект Nest за допомогою наступних команд у своєму терміналі ОС:
```bash
$ npm i -g @nestjs/cli
$ nest (назва проекту)
```

Буде створено каталог проекту, встановлені модульні вузли та кілька інших шаблонних файлів, а також створено каталог src /, який заповниться кількома основними файлами.

+ src
  + app.controller.spec.ts
  + app.controller.ts
  + app.module.ts
  + app.service.ts
  + main.ts

Короткий опис основних файлів

| `app.controller.ts`      | Базовий контролер з єдиним маршрутом                                                                      |
| `app.controller.spec.ts` | Блок тестів для контролера                                                                                |
| `app.module.ts`          | The root module of the application                                                                        |
| `app.service.ts`         | Базовий сервіс з одним методом                                                                            |
| `main.ts`                | Файл входу програми, який використовує основну функцію NestFactory для створення екземпляра програми Nest |

