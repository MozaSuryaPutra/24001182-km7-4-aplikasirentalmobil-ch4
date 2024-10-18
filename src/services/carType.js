const carTypeRepository = require("../repositories/cars.js");
const { NotFoundError, InternalServerError } = require("../utils/request.js");

exports.getCarType = async (capacity) => {
  const carType = await carTypeRepository.getCarType(capacity);
  if (carType.length < 1) {
    throw new NotFoundError("Car Is Not Found");
  }
  return carType;
};

exports.getCarTypeById = async (id) => {
  const carTypeId = await carTypeRepository.getCarTypeById(id);
  if (!carTypeId) {
    throw new NotFoundError("Cars is not found");
  }
  return carTypeId;
};

exports.createCarType = async (data, ) => {
  // Create the data
  return carTypeRepository.createCarType(data);
};

exports.updateCarType = async (id, data, file) => {
  // find Car is exist or not (validate the data)
  const existingCarType = carTypeRepository.getCarTypeById(id);
  if (!existingCarType) {
    throw new NotFoundError("Car is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingCarType, // existing Car
    ...data,
  };

  // if exist, we will update the Car data
  const updatedCar = carTypeRepository.updateCarType(id, data);
  if (!updatedCar) {
    throw new InternalServerError(["Failed to update Car!"]);
  }

  return updatedCar;
};

exports.deleteCarsById = async (id) => {
  const existingCarType = await carTypeRepository.getCarTypeById(id);
  if (!existingCarType) {
    throw new NotFoundError("Cars is not found");
  }
  const deletedCars = await carTypeRepository.deleteCarsById(id);
  if (!deletedCars) {
    throw new InternalServerError("Failed to delete Cars");
  }
  return deletedCars;
};
