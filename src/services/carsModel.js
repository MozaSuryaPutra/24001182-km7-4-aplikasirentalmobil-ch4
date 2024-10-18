const carsModelRepository = require("../repositories/carsModel.js");

exports.getCarsModel = async (manufacturer) => {
  return carsModelRepository.getCarsModel(manufacturer);
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

exports.updateStudent = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await studentService.updateStudent(id, req.body, req.files);
  successResponse(res, data);
};

exports.updateCarsModel = async (id, data) => {
  const existingCarsModel = await carsModelRepository.getCarsModelById(id);
  if (!existingCarsModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  data = {
    ...existingCarsModel, // existing Student
    ...data,
  };

  // if exist, we will update the student data
  const updatedCarsModel = await carsModelRepository.updateCarsModel(id, data);
  if (!updatedCarsModel) {
    throw new InternalServerError(["Failed to update student!"]);
  }

  return updatedCarsModel;
};

exports.deleteCarsModel = async (id) => {
  // find student is exist or not (validate the data)
  const existingCarsModel = await carsModelRepository.getCarsModelById(id);
  if (!existingCarsModel) {
    throw new NotFoundError("Car Model is Not Found!");
  }

  // if exist, we will delete the student data
  const deletedCarsModel = await carsModelRepository.deleteCarsModel(id);
  if (!deletedCarsModel) {
    throw new InternalServerError(["Failed to delete Car Model!"]);
  }

  return deletedCarsModel;
};
