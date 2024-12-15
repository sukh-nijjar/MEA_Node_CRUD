import database from "../services/database.js";
import {
    ScanCommand,
    PutCommand,
    GetCommand,
    UpdateCommand,
    DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import vehicleSchema from "../models/vehicle.js"

async function getAllVehicles(req, res, next) {
    try {
        const params = {
            TableName: "Vehicles",
        };
        const command = new ScanCommand(params);
        const result = await database.send(command);
        res.status(200).json(result.Items);
    } catch (err) {
        next(err);
    }
}

async function createVehicle(req, res, next) {
    try {
        if (!req.body) {
            console.log("Request is empty!");
            return res.status(400).send("REQUEST BODY MISSING");
        }
        console.log("REQUEST BODY: " + JSON.stringify(req.body, null, 2));
        const uuid = uuidv4();
        console.log("id is " + uuid)
        req.body.id = uuid;
        const { error, value } = vehicleSchema.validate(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        const { id, model, brand, fuel_type, year } = value;

        const params = {
            TableName: "Vehicles",
            Item: {
                id,
                model,
                brand,
                fuel_type,
                year,
            },
        };

        const command = new PutCommand(params);

        await database.send(command);

        res
            .status(201)
            .json({ message: "Successfully created vehicle", data: params.Item });

    } catch (error) {
        next(error);
    }
}

async function getVehicleById(req, res, next) {
    const vehicleId = req.params.id;
    try {
        const params = {
            TableName: "Vehicles",
            Key: { id: vehicleId },
        };
        const command = new GetCommand(params);
        const result = await database.send(command);
        if (!result.Item) {
            return res.status(404).json({ message: "No vehicle found" });
        }
        res.status(200).json(result.Item);
    } catch (err) {
        next(err);
    }
}

async function updateVehicleById(req, res) {
    try {
        const vehicleId = req.params.id;
        req.body.id = vehicleId;
        const { error, value } = vehicleSchema.validate(req.body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { id, model, brand, fuel_type, year } = value;

        // Get the vehicle from DynamoDB
        const getParams = {
            TableName: "Vehicles",
            Key: { id: vehicleId },
        };

        const getCommand = new GetCommand(getParams);

        const result = await database.send(getCommand);

        const vehicle = result.Item;

        if (!vehicle) {
            return res.status(404).json({ message: "No motor found" });
        }

        // Update the vehicle in DynamoDB
        const updateParams = {
            TableName: "Vehicles",
            Key: { id: vehicleId },
            UpdateExpression:
                "set #model = :model, #brand = :brand, #fuel_type = :fuel_type, #year = :year",
            ExpressionAttributeNames: {
                "#model": "model",
                "#brand": "brand",
                "#fuel_type": "fuel_type",
                "#year": "year",
            },
            ExpressionAttributeValues: {
                ":model": model,
                ":brand": brand,
                ":fuel_type": fuel_type,
                ":year": year,
            },
            ReturnValues: "ALL_NEW",
        };
        const updateCommand = new UpdateCommand(updateParams);
        const updatedVehicle = await database.send(updateCommand);

        res.status(200).json(updatedVehicle.Attributes);
    } catch (err) {
        next(err);
    }
}

async function deleteVehicleById(req, res) {
    const vehicleId = req.params.id;
    try {
        const params = {
            TableName: "Vehicles",
            Key: { id: vehicleId },
        };
        const command = new DeleteCommand(params);
        await database.send(command);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
}

export default {
    getAllVehicles,
    createVehicle,
    getVehicleById,
    updateVehicleById,
    deleteVehicleById
};
