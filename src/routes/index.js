const { Router } = require("express");
const router = Router();

// import routers
const transaction = require("./transaction");
const user = require("./user");
const price_bitcon = require("./price");

//setting router

router.use("/transaction", transaction);
router.use("/user", user);
router.use("/price_bitcon", price_bitcon);

module.exports = router;
