import { Injectable } from '@nestjs/common';
import { use } from 'passport';

export type User = {
  userId: number;
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'user1one0ne',
      email: 'lewak@wiosna.pl',
      password: '9743a66f914cc249efca164485a19c5c', // dupa -> md5
    },
    {
      userId: 2,
      username: 'd00pa',
      email: 'dupa@example.com',
      password: '9743a66f914cc249efca164485a19c5c',
    },
  ];

  async findOne(username: string): Promise<null | User> {
    return this.users.find(
      (user) => user.username === username || user.email === username
    );
  }
}
