const {
  checkout,
  getOrdersNew,
  getOrdersPending,
  getOrdersDone,
  getOrdersRemove,
  updateOrderStatus,
} = require("../controllers/order.controller");

module.exports = (route) => {
  route.get("/order/list-new", getOrdersNew);
  route.get("/order/list-pending", getOrdersPending);
  route.get("/order/list-done", getOrdersDone);
  route.get("/order/list-remove", getOrdersRemove);

  route.post("/order/checkout", checkout);
  route.put("/order/update-order-status/:id", updateOrderStatus);
};
