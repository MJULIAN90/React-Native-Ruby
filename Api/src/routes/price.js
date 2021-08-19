require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.get("/price", async (req, res) => {
  let price = await axios(process.env.API_KEY);
  res.json(price.data.bpi.USD);
});
module.exports = router;
