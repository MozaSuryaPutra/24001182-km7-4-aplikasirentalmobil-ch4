const express = require("express");
const carsRouter = require("./cars");
const carsModelRouter = require("./carsModel");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/models", carsModelRouter);

module.exports = router;
