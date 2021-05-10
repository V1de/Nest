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
```
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
| :----------------------- |:--------------------------------------------------------------------------------------------------------- |
| `app.controller.spec.ts` | Блок тестів для контролера                                                                                |
| `app.module.ts`          | The root module of the application                                                                        |
| `app.service.ts`         | Базовий сервіс з одним методом                                                                            |
| `main.ts`                | Файл входу програми, який використовує основну функцію NestFactory для створення екземпляра програми Nest |

## Контролери

Контролери відповідають за обробку вхідних запитів та повернення відповідей клієнту.

![Controller scheme](https://github.com/V1de/web-application/blob/main/doc/images/Controller.jpg)

Призначення контролера - отримувати конкретні запити на додаток. Механізм маршрутизації контролює, який контролер отримує які запити. Часто кожен контролер має більше одного маршруту, і різні маршрути можуть виконувати різні дії.

Для того, щоб створити базовий контролер, ми використовуємо класи та декоратори. Декоратори пов'язують класи з необхідними метаданими і дозволяють Nest створювати карту маршрутів (прив'язувати запити до відповідних контролерів).

### Створення контролера:

Щоб створити новий контролер, виконайте наступну команду в командному рядку, поки ви перебуваєте в каталозі проекту:

```
nest generate controller (назва)
```

Результат виконання команди:

```console
CREATE src/example/example.controller.spec.ts (499 bytes)
CREATE src/example/example.controller.ts (103 bytes)
UPDATE src/app.module.ts (397 bytes)
```

## Маршрутизація

У наступному прикладі ми будемо використовувати декоратор @Controller (), який необхідний для визначення базового контролера. Ми вкажемо необов’язковий префікс шляху маршруту (users). Використання префіксу шляху в декораторі @Controller () дозволяє легко згрупувати набір пов’язаних маршрутів та мінімізувати повторюваний код.

```ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  async addUser(@Body() user: CreateUserDto) {
    this.usersService.addUser(user);
  }
}
```

Наступним набором декораторів, підключених до маршрутизації у згаданому контролері, є @Get (), @Post (). Вони вказують Nest створити обробник для певної кінцевої точки для запитів HTTP. Вищевказаний контролер створює такий набір кінцевих точок:

`GET /users` - повертає всіх користувачів

`GET /users/{id}` - повертає користувача з переданим id

`POST /users` - створює нового користувача

За замовчуванням NestJS відповідає кодом стану 200 OK, за винятком 201, створеного для POST. Ми можемо це легко змінити за допомогою декоратора @HttpCode ().

## Доступ до тіла запиту

Коли ми обробляємо POST у контролері вище, нам також потрібно отримати доступ до тіла запиту. Роблячи це, ми можемо використовувати його для заповнення нашої імпровізованої бази даних.

NestJS пропонує декоратор @Body (), який забезпечує нам легкий доступ до тіла. Як і в серії TypeScript Express, ми вводимо поняття об'єкта передачі даних (DTO). Він визначає формат даних, надісланих у запиті. Це може бути як інтерфейс, так і клас.

`createUser.dto.ts`

```ts
interface CreateUserDto {
  name: string;
}
```

## Сервіси

Сервіс, який також можна назвати постачальником (provider) в Nest.js, був розроблений, щоб видалити логіку з контролерів, які призначені тільки для обробки HTTP-запитів і перенаправити складніші завдання сервісів. Сервіси - це прості класи JavaScript з @Injectable () декоратором поверх них. 

Щоб створити новий сервіс, виконайте наступну команду в командному рядку, поки ви перебуваєте в каталозі проекту:

```
nest generate service (назва)
```

Результат виконання команди:

```console
CREATE src/example/example.service.spec.ts (467 bytes)
CREATE src/example/example.service.ts (91 bytes)
UPDATE src/app.module.ts (388 bytes)
```

Команда створила файл (назва).service.spec.ts, який можна використовувати для тестування. Він також створив файл (назва).service.ts, який буде містити всю логіку для цього додатка.

Сервіс буде обробляти всю логіку в додатку, відповідати за взаємодію з імпровізованою базою даних і повертати відповідні відповіді назад контролеру.

Приклад вмісту файлу (назва).service.ts:

```ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  addUser(user: CreateUserDto) {
    const newUser = {
      id: ++this.users.length,
      ...user,
    };
    this.users.push(newUser);
  }
}
```

Ми використовуємо вбудований клас HttpException, щоб видавати помилки, які NestJS може зрозуміти. Коли ми видаємо HttpException ('Користувача не знайдено', HttpStatus.NOT_FOUND), вона поширюється на глобальний фільтр винятків, і відповідна відповідь надсилається клієнту.

## Модулі

Модуль - це клас, котрий коментується декоратором @Module (). Декоратор @Module () надає метадані, які Nest використовує для організації структури програми.

![Modules scheme](https://github.com/V1de/web-application/blob/main/doc/images/Modules.jpg)

Щоб створити новий модуль, виконайте наступну команду в командному рядку, поки ви перебуваєте в каталозі проекту:

```
nest generate module (назва)
```

Результат виконання команди:

```console
D:\Repo\Nest>nest generate module example
CREATE src/example/example.module.ts (84 bytes)
UPDATE src/app.module.ts (461 bytes)
```

Наші UsersController та UsersService тісно пов’язані та належать до одного домену програми. Тому доцільно розмістити їх у модулі разом. Роблячи це, ми впорядковуємо наш код за спільними ознаками. Це особливо корисно у міру зростання нашого додатка.

`users.module.ts`

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

Крім того, кожному додатку потрібен кореневий модуль. Це відправна точка для Nest при створенні програми.

`app.module.ts`

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Модуль містить:
* імпорти
  * імпортовані модулі - NestJS використовує `UsersModule` завдяки імпортуванню його в наш `AppModule`
* контролери 
  * контролери для створення екземплярів провайдерів
* експорти
  * підмножина провайдерів, доступних в інших модулях 

# Приклад API на NestJS

## Імітація бази даних

Створимо інтерфейс сутності користувача:

```ts
export interface User {
  id: number;
  name: string;
  age: number;
}
```

Вводимо поняття об'єкта передачі даних (DTO). Він визначає формат даних, надісланих у запиті. В нашому випадку це буде інтерфейс CreateUserDto.

`createUser.dto.ts`

```ts
interface CreateUserDto {
  name: string;
}
```

Та створимо масив користувачів з тестовими данними:

```ts
private users: User[] = [
    { id: 1, name: 'John Doe', age: 26 },
    { id: 2, name: 'Jane Doe', age: 22 },
  ];
```

## Генерація сервісу

Після виконання команди для створення сервісу буде створено два файли `users.service.ts`, який буде містити всю логіку та `users.service.spec.ts`, який можна використовувати для тестування.

Додамо в файл `users.service.ts` методи які будуть працювати з нашою імітованою базою.

```ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  private users: User[] = [];

  getUsers() {
    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async addUser(user: CreateUserDto) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}
```

## Генерація контролера

Після виконання команди для створення контролера буде створено два нових файли `users.controller.ts` та `users.controller.spec.ts`. Перший - це файл, який ви можете використовувати для написання автоматизованого тестування для новоствореного контролера. Останній - сам файл контролера.

В файлі `users.controller.ts` описуємо маршрути для отримуваних запитів:

```ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  async addUser(@Body() user: CreateUserDto) {
    return this.usersService.addUser(user);
  }
}
```

## Створення модулів

Створимо `users.module.ts`:

```ts 
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

Та імпортуємо наш модуль в кореневий модуль програми `app.module.ts`:

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Вище створене API готове для тестування.

## Запуск додатку

Для запуску додатку достатньо в кореневій папці виконати команду `npm run start`

![Start picture](https://github.com/V1de/web-application/blob/main/doc/images/Start.jpg)

Додаток запущено!

# Тестування

## Приклади запитів

Використаємо сервіс [reqbin](https://reqbin.com/) для відправки запитів нашому додатку та отримання результатів.

Приклад Get запиту для отримання всіх наявних користувачів:

![Get request picture](https://github.com/V1de/web-application/blob/main/doc/images/GetRequest.jpg)

Приклад Post запиту для додавання користувача:

![Post request picture](https://github.com/V1de/web-application/blob/main/doc/images/PostRequest.jpg)

Приклад Get запиту для отримання користувача по id:

![Get by id request picture](https://github.com/V1de/web-application/blob/main/doc/images/GetByIdRequest.jpg)

Приклад обробленого Get запиту для отримання користувача з не існуючим id:

![Get by id failed request picture](https://github.com/V1de/web-application/blob/main/doc/images/FailedRequest.png)

## Тестування з Nest

Nest прагне просувати найкращі практики розробки, включаючи ефективне тестування, тому включає такі функції, як наведені нижче, щоб допомогти розробникам та командам створювати та автоматизувати тести.

Функції:

+ автоматично встановлює стандартні модульні тести для компонентів та тести e2e для додатків;
+ надає інструменти за замовчуванням (наприклад, test runner);
+ забезпечує інтеграцію з Jest та Supertest.

## Встановлення

Для початку потрібно встановити вказаний пакет:

`npm i --save-dev @nestjs/testing`

## Юніт тестинг

У наступному прикладі ми перевіряємо клас UsersService. Як уже згадувалось, Jest надається як тестування за замовчуванням. Він виконує функції тестового запуску, а також надає функції затвердження та утиліти для подвійного тестування. У наступному базовому тесті ми вручну створюємо екземпляр цих класів і гарантуємо, що контролер та служба виконують свої функції.

`users.service.specs.ts`

```ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should return array of users', () => {
    const result = [
      { id: 1, name: 'John Doe', age: 26 },
      { id: 2, name: 'Jane Doe', age: 22 },
    ];
    expect(service.getUsers()).toEqual(result);
  });

  it('should return second user', () => {
    const result = { id: 1, name: 'John Doe', age: 26 };
    expect(service.getUserById(2)).toEqual(result);
  });
});
```

### Тест 1

Запуск:

![Start test 1 picture](https://github.com/V1de/web-application/blob/main/doc/images/Test1Start.jpg)

Результат:

![Test 1 result picture](https://github.com/V1de/web-application/blob/main/doc/images/Test1Result.jpg)

### Тест 2

Результат:

![Failed test 2 picture](https://github.com/V1de/web-application/blob/main/doc/images/FailedTest.jpg)

Тест не був пройдений так як відповідь сервера не відповідає передбачуваній!

