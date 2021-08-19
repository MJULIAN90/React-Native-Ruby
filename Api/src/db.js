require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

let db = [];

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );
db.balances = require("./models/balances")(sequelize);
db.users = require("./models/users")(sequelize);
db.transactions = require("./models/transactions")(sequelize);

console.log(db);

module.exports = {
  conn: sequelize,
};
