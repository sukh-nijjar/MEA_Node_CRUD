import joi from "joi";

const vehicleSchema = joi.object({
    id: joi.string().required(),
    model: joi.string().required(),
    brand: joi.string().required(),
    fuel_type: joi.string().required(),
    year: joi.number().required(),
});

export default vehicleSchema;
