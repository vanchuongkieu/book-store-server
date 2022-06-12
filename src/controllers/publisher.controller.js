const PublisherModel = require("../models/Publisher.model");
const BookModel = require("../models/Book.model");
const slugify = require("slugify");

module.exports = {
  getPublishers: async (req, res) => {
    try {
      const publishers = await PublisherModel.find({}).exec();
      res.status(200).json(publishers);
    } catch (error) {
      res.status(500).send("Lấy danh sách nhà sản xuất thất bại");
    }
  },
  getPublishersActive: async (req, res) => {
    try {
      const publishers = await PublisherModel.find({ status: true }).exec();
      res.status(200).json(publishers);
    } catch (error) {
      res.status(500).send("Lấy danh sách nhà sản xuất thất bại");
    }
  },
  getPublisher: async (req, res) => {
    try {
      const publishers = await PublisherModel.findOne({
        _id: req.params.id,
      }).exec();
      res.status(200).json(publishers);
    } catch (error) {
      res.status(500).send("Lấy nhà sản xuất thất bại");
    }
  },
  getPublisherByAscii: async (req, res) => {
    try {
      const publisher = await PublisherModel.findOne({
        nameAscii: req.params.ascii,
      }).exec();
      const books = await BookModel.find({ publisher: publisher._id })
        .populate("author")
        .exec();
      res.status(200).json({
        publisher,
        books,
      });
    } catch (error) {
      res.status(500).send("Lấy nhà sản xuất thất bại");
    }
  },
  createPublisher: async (req, res) => {
    try {
      const publisher = await new PublisherModel({
        ...req.body,
        nameAscii: slugify(req.body.name).toLowerCase(),
      }).save();
      res.status(201).json(publisher);
    } catch (error) {
      res.status(500).send("Thêm nhà sản xuất thất bại");
    }
  },
  updatePublisher: async (req, res) => {
    try {
      const publisher = await PublisherModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).exec();
      res.status(201).json(publisher);
    } catch (error) {
      res.status(500).send("Cập nhật nhà sản xuất thất bại");
    }
  },
  updatePublisherStatus: async (req, res) => {
    try {
      const publisher = await PublisherModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: !req.body.status,
          },
        },
        { new: true }
      ).exec();
      res.status(201).json(publisher);
    } catch (error) {
      res.status(500).send("Cập nhật trạng thái nhà sản xuất thất bại");
    }
  },
  deletePublisher: async (req, res) => {
    try {
      const publisher = await PublisherModel.findOneAndDelete({
        _id: req.params.id,
      }).exec();
      res.status(200).json(publisher);
    } catch (error) {
      res.status(500).send("Xóa nhà sản xuất thất bại");
    }
  },
};
