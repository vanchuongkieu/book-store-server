const {
  login,
  register,
  addToCart,
  getCarts,
} = require("../controllers/auth.controller");

module.exports = (route) => {
  route.post("/auth/login", login);
  route.post("/auth/register", register);
  route.post("/cart/add-to-cart", addToCart);
  route.get("/cart/list-cart/:id", getCarts);
};
