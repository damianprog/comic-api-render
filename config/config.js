require('dotenv').config();

const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const proConfig = process.env.DATABASE_URL;

module.exports = {
  development: devConfig,
  production: proConfig,
};
