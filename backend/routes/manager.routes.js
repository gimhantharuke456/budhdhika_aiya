const express = require("express");
const managerController = require("../controllers/manager.controller");
const router = express.Router();

router.post("/managers/register", managerController.registerManager);
router.post("/managers/login", managerController.loginManager);

module.exports = router;
