const express = require("express");
const router = express.Router();
const hallRequestController = require("../controllers/hallRequest.controller");

// Routes
router.post("/", hallRequestController.createHallRequest);
router.get("/", hallRequestController.getAllHallRequests);
router.get(
  "/createdBy/:createdBy",
  hallRequestController.getRequestsByCreatedBy
);
router.put("/:id", hallRequestController.updateHallRequest);
router.delete("/:id", hallRequestController.deleteHallRequest);

module.exports = router;
