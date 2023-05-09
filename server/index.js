const express = require("express");
const cors = require("cors");

const server = express();
server.use(express.json());
server.use(cors());

const rentalCars = [];

server.get("/rental-cars", (_, res) => {
  res.send(rentalCars);
});

server.get("/rental-cars/:carBrand", (req, res) => {
  const rentalCarsByCarBrand = rentalCars.filter((rentalCar) => {
    return (
      rentalCar.carBrand.toLowerCase() === req.params.carBrand.toLowerCase()
    );
  });
  res.send(rentalCarsByCarBrand);
});

server.get("/car-brands", (_, res) => {
  const carBrands = rentalCars.map((rentalCar) => {
    return rentalCar.carBrand;
  });

  /*
  Will get only unique car brands
  const uniqueCarBrands = [...new Set(carBrands)];
  (...) is spread operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  (Set) is Set class: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  */

  res.send(carBrands);
});

server.post("/register-car", (req, res) => {
  const payload = req.body;
  const newRentalCar = {
    owner: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      gender: payload.gender,
    },
    carBrand: payload.carBrand,
  };

  rentalCars.push(newRentalCar);

  res.status(201).end();
});

// GET, POST, PUT, PATCH (very rare), DELETE

server.listen(8080, () => console.log("server is running at 8080"));
