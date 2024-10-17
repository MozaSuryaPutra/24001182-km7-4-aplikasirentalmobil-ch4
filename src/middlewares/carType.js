const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateCarType = (req, res, next) => {
  console.log(req.body);

  const validateBody = z.object({
    body_style: z
      .string()
      .trim(),
    capacity: z
      .string()
      .trim()
      .transform((val) => parseInt(val, 10))
      .refine((val) => !isNaN(val) && val > 0, {
        message: "Capacity must be a positive integer",
      }),
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
