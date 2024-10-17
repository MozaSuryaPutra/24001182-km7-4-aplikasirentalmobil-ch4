const express = require("express");
const carsModelRouter = require("./carsModel");

const router = express.Router();

router.use("/models", carsModelRouter); // /models -> carsModelRouter

module.exports = router;
