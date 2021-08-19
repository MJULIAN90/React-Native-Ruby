/*  post 'user/login'
  post 'user/create'
  post 'user/balance' */

const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.post("/login", (req, res) => {
  res.send("aca login");
});
module.exports = router;
