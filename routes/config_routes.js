const indexR = require("./index");
const productsR = require("./products");
const vipR = require("./vip");
const countryR = require("./country");
const foodR = require("./food");
const userR = require("./users");
const countriesR = require("./countries");
exports.routerInit = (app) => {
  app.use("/", indexR);
  app.use("/products", productsR);
  app.use("/vip", vipR);
  app.use("/country", countryR);
  app.use("/food", foodR);
  app.use("/users", userR);
  app.use('/countries', countriesR);
  
};
