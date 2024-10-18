const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();
// exports.getCars = async (capacity) => {
//   // Convert capacity to number if it is a string
//   const numericCapacity = Number(capacity);

//   const searchedCars = await prisma.cars.findMany({
//     where: {
//       OR: [{ capacity: { gte: numericCapacity } }],
//     },
//     include: {
//       carModels: {
//         include: {
//           type: true,
//           manufactures: true,
//           transmissions: true,
//         },
//       },
//     },
//   });

//   const serializedCars = JSONBigInt.stringify(searchedCars);
//   return JSONBigInt.parse(serializedCars);
// };

// exports.getCarsById = async (id) => {
//   const carsFind = await prisma.cars.findFirst({
//     where: {
//       id: id,
//     },
//     include: {
//       carModels: {
//         include: {
//           type: true,
//           manufactures: true,
//           transmissions: true,
//         },
//       },
//     },
//   });

//   // Convert BigInt fields to string for safe serialization
//   const serializedCars = JSONBigInt.stringify(carsFind);
//   return JSONBigInt.parse(serializedCars);
// };

exports.createCarType = async (data) => {
  const newCars = await prisma.car_types.create({
    data: {
      id, // Menghasilkan id unik
      ...data, // Spread semua data dari request body ke sini
      body_style: data.body_style, // Parsing rentPerDay jadi integer
      capacity: parseInt(data.capacity), // Parsing capacity jadi integer
      fuel_type: data.fuel_type, // Parsing availableAt jadi Date
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCars = JSONBigInt.stringify(newCars);
  return JSONBigInt.parse(serializedCars);
};

// exports.updateCars = async (id, data) => {
//   const updatedCars = await prisma.cars.update({
//     where: {
//       id: id,
//     },
//     include: {
//       carModels: {
//         include: {
//           type: true,
//           manufactures: true,
//           transmissions: true,
//         },
//       },
//     },
//     data,
//   });

//   // Convert BigInt fields to string for safe serialization
//   const serializedCars = JSONBigInt.stringify(updatedCars);
//   return JSONBigInt.parse(serializedCars);
// };

// exports.deleteCarsById = async (id) => {
//   const deletedCar = await prisma.cars.delete({
//     where: { id: id },
//   });

//   const serializedCar = JSONBigInt.stringify(deletedCar);
//   return JSONBigInt.parse(serializedCar);
// };
