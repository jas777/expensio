import { environment } from '../../environments/environment';
import { getMetadataArgsStorage } from 'typeorm';

export default () => {
  console.log(__dirname)
  return {
    type: 'postgres',
    host: process.env.DB_ADDRESS,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: environment.production ? 'expensio' : 'expensio_dev',
    entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
    synchronize: !environment.production,
  };
};
