const {
  getAuthors,
  getAuthor,
  updateAuthor,
  createAuthor,
  deleteAuthor,
  updateAuthorStatus,
  getAuthorsActive,
  getAuthorByAscii,
} = require("../controllers/author.controller");

module.exports = (app) => {
  app.get("/authors", getAuthors);
  app.get("/authors/find-authors-active", getAuthorsActive);
  app.get("/authors/find-author-by-id/:id", getAuthor);
  app.get("/authors/find-author-by-ascii/:ascii", getAuthorByAscii);
  app.put("/authors/update-author/:id", updateAuthor);
  app.put("/authors/update-author-status/:id", updateAuthorStatus);
  app.post("/authors/create-author", createAuthor);
  app.delete("/authors/delete-author/:id", deleteAuthor);
};
