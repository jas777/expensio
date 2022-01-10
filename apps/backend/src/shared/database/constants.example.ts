import { environment } from '../../environments/environment';
import UserEntity from '../entities/user.entity';

export default {
  type: 'postgres',
  host: 'db ip',
  port: 5432,
  username: 'db username',
  password: 'db password',
  database: environment.production ? 'expensio' : 'expensio_dev',
  entities: [UserEntity],
  synchronize: !environment.production,
};
