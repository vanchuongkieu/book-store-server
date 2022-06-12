const {
  getBooks,
  getBookById,
  getBookByAscii,
  createBook,
  updateBook,
  deleteBook,
  updateStatusBook,
  getBooksActive,
  updatePinBook,
  updateFeaturedBook,
  getBooksHome,
  getBooksSearch,
} = require("../controllers/books.controller");

module.exports = (app) => {
  app.get("/books", getBooks);
  app.post("/books/search-books", getBooksSearch);
  app.get("/books/find-books-active", getBooksActive);
  app.get("/books/find-books-home", getBooksHome);
  app.get("/books/find-book-by-id/:id", getBookById);
  app.get("/books/find-book-by-ascii/:ascii", getBookByAscii);
  app.put("/books/update-book/:id", updateBook);
  app.put("/books/update-status-book/:id", updateStatusBook);
  app.put("/books/update-featured-book/:id", updateFeaturedBook);
  app.post("/books/create-book", createBook);
  app.delete("/books/delete-book/:id", deleteBook);
};
