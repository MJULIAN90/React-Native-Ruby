const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.post("/sell", (req, res) => {
  res.send("aca sell");
});

router.post("/buy", (req, res) => {
  res.send("aca buy");
});

router.post("/historyTransactions", (req, res) => {
  res.send("aca historyTransactions");
});

router.post("/Transaction", (req, res) => {
  res.send("aca Transaction");
});

module.exports = router;
