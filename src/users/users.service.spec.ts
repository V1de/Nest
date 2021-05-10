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
    expect(service.getUserById(1)).toEqual(result);
  });
});
