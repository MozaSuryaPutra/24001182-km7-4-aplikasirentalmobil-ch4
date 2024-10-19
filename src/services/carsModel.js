const carsModelRepository = require("../repositories/carsModel.js");
const { NotFoundError, InternalServerError } = require("../utils/request.js");

exports.getCarsModel = async (manufacturer) => {
  const carsModel = await carsModelRepository.getCarsModel(manufacturer);
  if (carsModel.length < 1) {
    throw new NotFoundError("Car Is Not Found");
  }

  return carsModel;
};

exports.getCarsModelById = async (id) => {
  const carsModel = await carsModelRepository.getCarsModelById(id);
  if (!carsModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  return carsModel;
};

exports.createCarsModel = async (data) => {
  return carsModelRepository.createCarsModel(data);
};

exports.updateCarsModel = async (id, data) => {
  const existingCarsModel = await carsModelRepository.getCarsModelById(id);
  if (!existingCarsModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  data = {
    ...existingCarsModel,
    ...data,
  };

  const updatedCarsModel = await carsModelRepository.updateCarsModel(id, data);
  if (!updatedCarsModel) {
    throw new InternalServerError(["Failed to update car model!"]);
  }

  return updatedCarsModel;
};

exports.deleteCarsModel = async (id) => {
  const existingCarsModel = await carsModelRepository.getCarsModelById(id);
  if (!existingCarsModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  const deletedCarsModel = await carsModelRepository.deleteCarsModel(id);
  if (!deletedCarsModel) {
    throw new InternalServerError(["Failed to delete Car Model!"]);
  }

  return deletedCarsModel;
};
