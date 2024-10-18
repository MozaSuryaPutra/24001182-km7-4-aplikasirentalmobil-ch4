const carTypeService = require("../services/carType");
const { successResponse } = require("../utils/response");
const carTypeRepository = require("../repositories/carType");

exports.getCarType = async (req, res, next) => {
  const data = await carTypeService.getCarType(
    req.query?.capacity,
  );
  successResponse(res, data);
};

exports.getCarTypeById = async (req, res, next) => {
  const { id } = req.params;
  const data = await carTypeService.getCarTypeById(id);
  successResponse(res, data, "Get Cars By Id is Success");
};

exports.createCarType = async (req, res, next) => {
  const data = await carTypeService.createCarType(req.body);
  successResponse(res, data);
};

exports.updateCarType = async (req, res, next) => {
  const { id } = req.params;
  const updatedCarType = await carTypeService.updateCarType(id, req.body);
  successResponse(res, updatedCarType, "Update Student is Success");
};

exports.deleteCarById = async (req, res, next) => {
  const { id } = req.params;
  const deletedCarType = await carTypeService.deleteCarById(id);
  successResponse(res, deletedCarType, "Delete Car is Success");
};
