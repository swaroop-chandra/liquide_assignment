const express = require("express");
const router = express.Router();

const { liquideRouter } = require("./liquide");

router.use("/liquide", liquideRouter);

module.exports = router;
