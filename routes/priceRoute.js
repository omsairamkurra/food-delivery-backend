const express = require("express");
const router = express.Router();
const pricingController = require("../controllers/priceController");

router.post("/calculate-price", pricingController.calculatePrice);
router.post("/prices", pricingController.createPrice);
router.post("/create-organization", pricingController.createOrganization);
router.post("/create-Item", pricingController.createItem);

module.exports = router;
