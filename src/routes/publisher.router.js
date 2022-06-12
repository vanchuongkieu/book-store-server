const {
  getPublishers,
  getPublisher,
  updatePublisher,
  createPublisher,
  deletePublisher,
  updatePublisherStatus,
  getPublishersActive,
  getPublisherByAscii,
} = require("../controllers/publisher.controller");

module.exports = (app) => {
  app.get("/publishers", getPublishers);
  app.get("/publishers/find-publishers-active", getPublishersActive);
  app.get("/publishers/find-publisher-by-id/:id", getPublisher);
  app.get("/publishers/find-publisher-by-ascii/:ascii", getPublisherByAscii);
  app.put("/publishers/update-publisher/:id", updatePublisher);
  app.put("/publishers/update-publisher-status/:id", updatePublisherStatus);
  app.post("/publishers/create-publisher", createPublisher);
  app.delete("/publishers/delete-publisher/:id", deletePublisher);
};
