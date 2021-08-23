const { Router } = require("express");
const router = Router();
const { Transaction, Balance } = require("../db");

router.post("/sell", async (req, res) => {
  const { type_transaction, user_id, csend, creceive, asend, areceive } =
    req.body;

  const userBalance = await Balance.findAll({
    where: { user_id: user_id.toString() },
  });

  const { btc, usd } = userBalance[0].dataValues;

  if (creceive === "usd") {
    if (btc > asend) {
      await Transaction.create({
        type_transaction,
        csend,
        creceive,
        asend,
        areceive,
        userId: user_id,
      });

      let response = await Balance.update(
        { usd: usd + areceive, btc: btc - asend },
        {
          where: {
            user_id,
          },
        }
      );

      return res.send(response);
    }

    return res.send("2");
  }

  if (creceive === "btc") {
    if (usd > asend) {
      await Transaction.create({
        type_transaction,
        csend,
        creceive,
        asend,
        areceive,
        userId: user_id,
      });

      let response = await Balance.update(
        { btc: btc + areceive, usd: usd - asend },
        {
          where: {
            user_id,
          },
        }
      );

      return res.send(response);
    }

    return res.send("2");
  }
});

router.post("/buy", async (req, res) => {
  const { type_transaction, user_id, csend, creceive, asend, areceive } =
    req.body;

  const userBalance = await Balance.findAll({
    where: { user_id: user_id.toString() },
  });

  const { btc, usd } = userBalance[0].dataValues;

  if (creceive === "usd") {
    if (btc > asend) {
      await Transaction.create({
        type_transaction,
        csend,
        creceive,
        asend,
        areceive,
        userId: user_id,
      });

      let response = await Balance.update(
        { usd: usd + areceive, btc: btc - asend },
        {
          where: {
            user_id,
          },
        }
      );

      return res.send(response);
    }

    return res.send("2");
  }

  if (creceive === "btc") {
    if (usd > asend) {
      await Transaction.create({
        type_transaction,
        csend,
        creceive,
        asend,
        areceive,
        userId: user_id,
      });

      let response = await Balance.update(
        { btc: btc + areceive, usd: usd - asend },
        {
          where: {
            user_id,
          },
        }
      );

      return res.send(response);
    }

    return res.send("2");
  }
});

router.post("/historyTransactions", async (req, res) => {
  const { user_id } = req.body;

  const userTransactions = await Transaction.findAll({
    where: { userId: user_id },
  });

  if (userTransactions.length === 0) return res.send(userTransactions);

  res.send(userTransactions);
});

router.post("/Transaction", async (req, res) => {
  const { id } = req.body;

  let idDetails = await Transaction.findByPk(id);

  res.send(idDetails.dataValues);
});

module.exports = router;
