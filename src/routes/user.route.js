const {
  getUsers,
  getUser,
  updateUser,
  updateUserStatus,
  createUser,
  deleteUser,
  updateUserRole,
} = require("../controllers/users.controller");

module.exports = (app) => {
  app.get("/users", getUsers);
  app.get("/users/find-user-by-id/:id", getUser);
  app.put("/users/update-user/:id", updateUser);
  app.put("/users/update-user-status/:id", updateUserStatus);
  app.put("/users/update-user-role/:id", updateUserRole);
  app.post("/users/create-user", createUser);
  app.delete("/users/delete-user/:id", deleteUser);
};
