const AuthorModel = require("../models/Author.model");
const BookModel = require("../models/Book.model");
const slugify = require("slugify");

module.exports = {
  getAuthors: async (req, res) => {
    try {
      const authors = await AuthorModel.find({}).exec();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).send("Lấy danh sách tác giả thất bại");
    }
  },
  getAuthorsActive: async (req, res) => {
    try {
      const authors = await AuthorModel.find({ status: true }).exec();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).send("Lấy danh sách tác giả thất bại");
    }
  },
  getAuthor: async (req, res) => {
    try {
      const authors = await AuthorModel.findOne({
        _id: req.params.id,
      }).exec();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).send("Lấy tác giả thất bại");
    }
  },
  getAuthorByAscii: async (req, res) => {
    try {
      const author = await AuthorModel.findOne({
        nameAscii: req.params.ascii,
      }).exec();
      const books = await BookModel.find({ author: author._id })
        .populate("author")
        .exec();
      res.status(200).json({
        author,
        books,
      });
    } catch (error) {
      res.status(500).send("Lấy tác giả thất bại");
    }
  },
  createAuthor: async (req, res) => {
    try {
      const author = await new AuthorModel({
        ...req.body,
        nameAscii: slugify(req.body.name).toLowerCase(),
      }).save();
      res.status(201).json(author);
    } catch (error) {
      res.status(500).send("Thêm tác giả thất bại");
    }
  },
  updateAuthor: async (req, res) => {
    try {
      const author = await AuthorModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).exec();
      res.status(201).json(author);
    } catch (error) {
      res.status(500).send("Cập nhật tác giả thất bại");
    }
  },
  updateAuthorStatus: async (req, res) => {
    try {
      const author = await AuthorModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: !req.body.status,
          },
        },
        { new: true }
      ).exec();
      res.status(201).json(author);
    } catch (error) {
      res.status(500).send("Cập nhật trạng thái tác giả thất bại");
    }
  },
  deleteAuthor: async (req, res) => {
    try {
      const author = await AuthorModel.findOneAndDelete({
        _id: req.params.id,
      }).exec();
      res.status(200).json(author);
    } catch (error) {
      res.status(500).send("Xóa tác giả thất bại");
    }
  },
};
