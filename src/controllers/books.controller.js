const BookModel = require("../models/Book.model");
const cloudinary = require("../utils/cloudinary");
const slugify = require("slugify");

module.exports = {
  getBooks: async (req, res) => {
    try {
      const books = await BookModel.find({})
        .populate(["category", "author", "publisher"])
        .exec();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
  },
  getBooksSearch: async (req, res) => {
    try {
      const books = await BookModel.find({
        name: { $regex: new RegExp(req.body.keyword), $options: "i" },
      })
        .populate(["category", "author"])
        .exec();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
  },
  getBooksActive: async (req, res) => {
    try {
      const books = await BookModel.find({ status: true }).exec();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
  },
  getBooksHome: async (req, res) => {
    try {
      const booksPin = await BookModel.find({ pin: true }).exec();
      const booksFeatured = await BookModel.find({
        featured: true,
        status: true,
      })
        .populate(["category", "author"])
        .limit(3)
        .exec();
      const booksNew = await BookModel.find({ status: true })
        .sort({ createdAt: -1 })
        .populate(["category", "author"])
        .limit(5)
        .exec();
      const books = await BookModel.find({}).limit(10).exec();
      res.status(200).json({
        booksPin,
        booksFeatured,
        booksNew,
        books,
      });
    } catch (error) {
      res.status(500).send("Lấy danh sách sản phẩm thất bại");
    }
  },
  getBookById: async (req, res) => {
    try {
      const book = await BookModel.findOne({
        _id: req.params.id,
      }).exec();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).send("Lấy sản phẩm thất bại");
    }
  },
  getBookByAscii: async (req, res) => {
    try {
      const book = await BookModel.findOne({
        nameAscii: req.params.ascii,
      })
        .populate(["category", "author", "publisher"])
        .exec();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).send("Lấy sản phẩm thất bại");
    }
  },
  createBook: async (req, res) => {
    try {
      const { name, image } = req.body;
      const imageURL = await cloudinary.uploadSingleWithBase64(image);
      const book = await new BookModel({
        ...req.body,
        image: imageURL,
        nameAscii: slugify(name).toLowerCase(),
      }).save();
      return res.status(201).json(book);
    } catch (error) {
      return res.status(500).send("Thêm sản phẩm thất bại");
    }
  },

  updateBook: async (req, res) => {
    try {
      const { name, image } = req.body;
      const imageURL = await cloudinary.uploadSingleWithBase64(image);
      const book = await BookModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...req.body,
            image: imageURL,
            nameAscii: slugify(name).toLowerCase(),
          },
        },
        { new: true }
      ).exec();
      return res.status(201).json(book);
    } catch (error) {
      return res.status(500).send("Cập nhật sản phẩm thất bại");
    }
  },
  deleteBook: async (req, res) => {
    try {
      const book = await BookModel.findOneAndDelete({
        _id: req.params.id,
      }).exec();
      return res.status(201).json(book);
    } catch (error) {
      return res.status(500).send("Xoá sản phẩm thất bại");
    }
  },
  updateStatusBook: async (req, res) => {
    try {
      const book = await BookModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: !req.body.status,
          },
        },
        { new: true }
      ).exec();
      res.status(201).json(book);
    } catch (error) {
      res.status(500).send("Cập nhật trạng thái thất bại");
    }
  },
  updateFeaturedBook: async (req, res) => {
    try {
      const book = await BookModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            featured: !req.body.featured,
          },
        },
        { new: true }
      ).exec();
      res.status(201).json(book);
    } catch (error) {
      res.status(500).send("Cập nhật nổi bật thất bại");
    }
  },
};
