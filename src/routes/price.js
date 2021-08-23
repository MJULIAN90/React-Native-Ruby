require("dotenv").config();
const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.get("/price", async (req, res) => {
  let price = await axios(process.env.API_KEY);

  res.send({ response: price.data.bpi.USD.rate_float });
});
module.exports = router;
