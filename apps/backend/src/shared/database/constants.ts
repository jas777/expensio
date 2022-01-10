import { environment } from '../../environments/environment';
import UserEntity from "../entities/user.entity";

export default {
  type: 'postgres',
  host: process.env.DB_ADDRESS,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: environment.production ? 'expensio' : 'expensio_dev',
  entities: [UserEntity],
  synchronize: !environment.production,
};
