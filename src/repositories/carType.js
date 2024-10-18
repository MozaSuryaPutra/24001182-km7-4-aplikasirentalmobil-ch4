const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getCarType = async (capacity) => {
  // Convert capacity to number if it is a string
  const numericCapacity = Number(capacity);

  // It will generate the query
  let query = {};
  if (capacity) {
      query.push({
          nick_name: { contains: capacity, mode: "insensitive" },
      });
  }

  // Find by query
  const searchedCarType = await prisma.car_types.findMany({
    where: query,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarType = JSONBigInt.stringify(searchedCarType);
  return JSONBigInt.parse(serializedCarType);
};

exports.getCarTypeById = async (id) => {
  const carType = await prisma.car_types.findFirst({
    where: {
      id: id,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarType = JSONBigInt.stringify(carType);
  return JSONBigInt.parse(serializedCarType);
};

exports.createCarType = async (data) => {
  const newCarType = await prisma.car_types.create({
    data: {
      id, // Menghasilkan id unik
      ...data, // Spread semua data dari request body ke sini
      // body_style: data.body_style, 
      // capacity: parseInt(data.capacity),
      // fuel_type: data.fuel_type,
    },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarType = JSONBigInt.stringify(newCarType);
  return JSONBigInt.parse(serializedCarType);
};

exports.updateCarType = async (id, data) => {
  const updatedCarType = await prisma.car_types.update({
    where: { id },
    data,
  });

  // Convert BigInt fields to string for safe serialization
  const serializedCarType = JSONBigInt.stringify(updatedCarType);
  return JSONBigInt.parse(serializedCarType);
};

exports.deleteCarTypeById = async (id) => {
  const deletedCarType = await prisma.car_types.delete({
    where: { id },
  });

  const serializedCarType = JSONBigInt.stringify(deletedCarType);
  return JSONBigInt.parse(serializedCarType);
};
