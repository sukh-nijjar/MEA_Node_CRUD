import express from "express";
import vehiclesController from "../controllers/vehiclesController.js";

const Router = express.Router();

Router.route("/vehicles")
    .get(vehiclesController.getAllVehicles)
    .post(vehiclesController.createVehicle);

Router.route("/vehicles/:id") // <-- this defines an endpoint with a "placeholder" for the id
    .get(vehiclesController.getVehicleById)
    .put(vehiclesController.updateVehicleById)
    .delete(vehiclesController.deleteVehicleById);

/* Router.route("/vehicles/:brand")
    .get(vehiclesController.getVehiclesByBrand) */

export default Router;
