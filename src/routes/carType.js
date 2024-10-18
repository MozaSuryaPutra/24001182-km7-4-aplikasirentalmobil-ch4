const express = require("express");
const { validateCreateCarType } = require("../middlewares/carType");
const { createCarType } = require("../controllers/carsType");

const router = express.Router();

router.route("/").post(validateCreateCarType, createCarType);

module.exports = router;
