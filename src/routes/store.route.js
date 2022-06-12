const { getHomeData } = require("../controllers/store.controller");

module.exports = (route) => {
  route.get("/store/get-home-data", getHomeData);
};
