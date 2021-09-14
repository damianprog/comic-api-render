require('dotenv').config();

// const devConfig = {
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
// };

const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const proConfig = {
//   connectionString: process.env.DATABASE_URL,
// };

const proConfig = process.env.DATABASE_URL;

module.exports = {
  development: devConfig,
  production: proConfig,
};
