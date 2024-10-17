const express = require("express");
const carsRouter = require("./cars");
const carTypeRouter = require("./carType");

const router = express.Router();

router.use("/cars", carsRouter);
router.use("/car-type", carTypeRouter);

module.exports = router;
