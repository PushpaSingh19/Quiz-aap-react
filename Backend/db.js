const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "newdatabase12",
  password: "pushpa@19",
});

pool
  .connect()
  .then(() => console.log("connection success"))
  .catch((err) => console.log(err));

module.exports = pool;
