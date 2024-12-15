function getAllVehicles(req, res) {
    const brand = req.query.brand;
    if (brand) {
        res.send(
            "🤖 Vehicles Controller Route with GET method - this endpoint will return vehicles by brand from the database. The Brand is: " +
            brand
        );
    } else {
        res.send(
            "🤖 Vehicles Controller Route with GET method - this endpoint will get all of the vehicles from the database");
    }
}

function createVehicle(req, res) {
    res.send(
        "🤖 Vehicles Controller Route with POST method - this endpoint will create a new vehicle in the database"
    );
}

function getVehicleById(req, res) {
    const vechicleId = req.params.id; // <-- this is where we get the id from the request url
    res.send(
        "🤖 Vehicles Controller Route with GET method - this endpoint will return a vehicle by id from the database. The id is: " +
        vechicleId
    );
}

function updateVehicleById(req, res) {
    const vechicleId = req.params.id; // <-- this is where we get the id from the request url
    res.send(
        "🤖 Vehicles Controller Route with PUT method - this endpoint will update a single vehicle by id from the database. The id is: " +
        vechicleId
    );
}

function deleteVehicleById(req, res) {
    const vechicleId = req.params.id; // <-- this is where we get the id from the request url
    res.send(
        "🤖 Vehicles Controller Route with DELETE method - this endpoint will DELETE a single vehicle by id from the database. The id is: " +
        vechicleId
    );
}

export default {
    getAllVehicles,
    createVehicle,
    getVehicleById,
    updateVehicleById,
    deleteVehicleById
};
