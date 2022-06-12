const BookModel = require("../models/Book.model");
const CategoryModel = require("../models/Category.model");
const slugify = require("slugify");

module.exports = {
  getCategories: async (req, res) => {
    try {
      const categories = await CategoryModel.find({}).exec();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).send("Lấy danh sách danh mục thất bại");
    }
  },
  getCategoriesActive: async (req, res) => {
    try {
      const categories = await CategoryModel.find({ status: true }).exec();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).send("Lấy danh sách danh mục thất bại");
    }
  },
  getCategoryById: async (req, res) => {
    try {
      const category = await CategoryModel.findOne({
        _id: req.params.id,
      }).exec();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).send("Lấy danh mục thất bại");
    }
  },
  getCategoryByAscii: async (req, res) => {
    try {
      const category = await CategoryModel.findOne({
        nameAscii: req.params.ascii,
      }).exec();
      const books = await BookModel.find({ category: category._id })
        .populate("author")
        .exec();
      res.status(200).json({
        category,
        books,
      });
    } catch (error) {
      res.status(500).send("Lấy danh mục thất bại");
    }
  },
  getCategoryBooksByAscii: async (req, res) => {
    try {
      const category = await CategoryModel.findOne({
        nameAscii: req.params.ascii,
      }).exec();
      const books = await BookModel.find({
        category: category._id,
      })
        .populate(["category", "author", "publisher"])
        .exec();
      res.status(200).json({
        category,
        books,
      });
    } catch (error) {
      res.status(500).send("Lấy danh sách sản phẩm theo danh mục thất bại");
    }
  },
  createCategory: async (req, res) => {
    try {
      const category = await new CategoryModel({
        ...req.body,
        nameAscii: slugify(req.body.name).toLowerCase(),
      }).save();
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).send("Thêm danh mục thất bại");
    }
  },

  updateCategory: async (req, res) => {
    try {
      const category = await CategoryModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            ...req.body,
            nameAscii: slugify(req.body.name).toLowerCase(),
          },
        },
        { new: true }
      ).exec();
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).send("Cập nhật danh mục thất bại");
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await CategoryModel.findOneAndDelete({
        _id: req.params.id,
      }).exec();
      return res.status(201).json(category);
    } catch (error) {
      return res.status(500).send("Xoá danh mục thất bại");
    }
  },
  updateFeaturedCategory: async (req, res) => {
    try {
      const category = await CategoryModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            featured: !req.body.featured,
          },
        },
        { new: true }
      ).exec();
      res.status(201).json(category);
    } catch (error) {
      res.status(500).send("Cập nhật trạng thái thất bại");
    }
  },
};
