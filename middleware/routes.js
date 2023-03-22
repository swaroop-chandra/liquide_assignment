const apiRouter = require("../routes");

//Liquide route ----------------------------------------------
const { liquideRouter } = require("../routes/liquide");

module.exports = function (app) {
  app.use(apiRouter, liquideRouter);
};
