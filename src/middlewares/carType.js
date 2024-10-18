const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCarType = (req, res, next) => {
  const carValidationSchema = z.object({
    capacity: z
      .string()
      .transform((val) => parseInt(val, 10))
      .optional().nullable(),
  });

  const resultValidateQuery = carValidationSchema.safeParse(req.query);

  if (!resultValidateQuery.success) {
    throw new BadRequestError(resultValidateQuery.error.errors);
  }

  next();
};

exports.validateGetCarTypeById = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);

  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }
  next();
};

exports.validateCreateCarType = (req, res, next) => {
  console.log(req.body);

  const validateBody = z.object({
    body_style: z
      .string()
      .trim(),
    capacity: z
      .string()
      .trim()
      .transform((val) => parseInt(val, 10)),
      // .refine((val) => !isNaN(val) && val >= 1886, {
      //   message: "capacity must be a valid number",
      // }),
    fuel_type: z.string().trim(),
  });


  // Validate
  const result = validateBody.safeParse(req.body);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};

exports.validateUpdateCarType = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  validateParams.safeParse(req.params);
  const resultValidateParams = validateParams.safeParse(req.params);

  if (!resultValidateParams.success) {
    // If validation fails, return error messages
    throw new BadRequestError(resultValidateParams.error.errors);
  }

  const validateBody = z.object({
    body_style: z
    .string()
    .trim().optional(),
    capacity: z
      .string()
      .trim()
      .transform((val) => parseInt(val, 10)).optional(),
      // .refine((val) => !isNaN(val) && val >= 1886, {
      //   message: "capacity must be a valid number",
      // }),
    fuel_type: z.string().trim().optional(),
  });

  //Validasi
  const resultValidateBody = validateBody.safeParse(req.body);
  if (!resultValidateBody.success) {
    throw new BadRequestError(resultValidateBody.error.errors);
  }
  next();
};

exports.validateDeleteCarType = (req, res, next) => {
  const validateParams = z.object({
    id: z.string(),
  });

  const result = validateParams.safeParse(req.params);
  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }
  next();
};
