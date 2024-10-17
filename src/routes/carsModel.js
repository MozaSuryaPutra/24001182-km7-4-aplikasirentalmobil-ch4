const express = require("express");
const { validateCreateCarsModel } = require("../middlewares/carsModel.js");
const { createCarsModel } = require("../controllers/carsModel.js");

const router = express.Router();

router.post("/carsModel", validateCreateCarsModel, createCarsModel);

module.exports = router;
