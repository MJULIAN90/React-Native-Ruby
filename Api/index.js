require("dotenv").config();
const { conn } = require("./src/db.js");
const server = require("./src/app");

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server Port ${process.env.PORT}`);
  });
  console.log("DB ok");
});
