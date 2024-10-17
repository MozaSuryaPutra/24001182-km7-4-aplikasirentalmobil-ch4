const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateCreateCarsModel = (req, res, next) => {
  console.log(req.body);

  // Function to split the CSV string into an object
  const splitStringToObject = (str) => {
    return str.split(",").reduce((acc, item) => {
      const [key, value] = item.split(":").map((s) => s.trim());
      acc[key] = value;
      return acc;
    }, {});
  };

  // Validate the incoming request body
  const validateBody = z.object({
    model_name: z.string().min(1, "Model name is required"),
    manufacturer: z.string().min(1, "Manufacturer name is required"),
    transmissions: z.string().min(1, "Transmissions name is required"),
    description: z.string().trim(),
    type_id: z.string().min(1, "Type id name is required"),
    specs: z.object({}).optional(), // Expecting an object but allowing optional
    options: z.object({}).optional(), // Expecting an object but allowing optional
  });

  // Parse and reconstruct specs and options from the incoming request
  const parsedSpecs = splitStringToObject(req.body.specs || "");
  const parsedOptions = splitStringToObject(req.body.options || "");

  // Validate
  const result = validateBody.safeParse({
    ...req.body,
    specs: parsedSpecs,
    options: parsedOptions,
  });

  if (!result.success) {
    // If validation fails, return error messages
    throw new BadRequestError(result.error.errors);
  }

  next();
};
