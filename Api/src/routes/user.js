const { Router, response } = require("express");
const router = Router();
const { User, Balance } = require("../db");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let userExist = await User.findOne({ where: { username } });

  if (userExist) {
    const { dataValues } = userExist;

    if (dataValues.password === password)
      return res.send({ response: dataValues.id });
    if (dataValues.password !== password)
      return res.send({ response: "clave invalida" });
  }

  return res.send({ response: "usuario no existe" });
});

router.post("/create", async (req, res) => {
  const { username, password } = req.body;

  let info = await User.create({ username, password });

  console.log(info);

  res.send("User Created");
});

router.post("/saldo", async (req, res) => {
  const { user_id, btc, usd } = req.body;

  await Balance.create({ user_id, btc, usd });

  res.send("Carga realizada");
});

router.post("/balance", async (req, res) => {
  const { user_id } = req.body;

  const userBalance = await Balance.findAll({
    where: { user_id: user_id.toString() },
  });

  if (userBalance.length > 0) {
    let data = {
      usd: userBalance[0].dataValues.usd,
      btc: userBalance[0].dataValues.btc,
    };

    return res.send(data);
  }

  res.send("Sin fondos");
});

module.exports = router;
