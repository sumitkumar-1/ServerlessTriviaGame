const express = require("express");
const router = express.Router();
const authGuard = require("../middlewares/authGuard");
const UserController = require("../controllers/userController");

router.post("/saveUser", UserController.save);
router.get("/getGameData", authGuard, UserController.getGameData);
router.post("/updateGameData", authGuard, UserController.update);

module.exports = { router };
