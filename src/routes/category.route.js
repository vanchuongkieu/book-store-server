const {
  getCategories,
  getCategoryById,
  getCategoryByAscii,
  getCategoryBooksByAscii,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoriesActive,
  updateFeaturedCategory,
} = require("../controllers/categories.controller");

module.exports = (app) => {
  app.get("/categories", getCategories);
  app.get("/categories/find-categories-active", getCategoriesActive);
  app.get("/categories/find-category-by-id/:id", getCategoryById);
  app.get("/categories/find-all-books/:ascii", getCategoryBooksByAscii);
  app.get("/categories/find-category-by-ascii/:ascii", getCategoryByAscii);
  app.put("/categories/update-category/:id", updateCategory);
  app.put("/categories/update-category-featured/:id", updateFeaturedCategory);
  app.post("/categories/create-category", createCategory);
  app.delete("/categories/delete-category/:id", deleteCategory);
};
