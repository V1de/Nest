import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(() => {
    usersService = new UsersService();
    usersController = new UsersController(usersService);
  });

  it('should return second user', () => {
    const result = { id: 2, name: 'Jane Doe', age: 22 };
    expect(usersController.getUserById('2')).toEqual(result);
  });
});
