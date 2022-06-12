const AuthorModel = require("../models/Author.model");
const CategoryModel = require("../models/Category.model");
const PublisherModel = require("../models/Publisher.model");
const BookModel = require("../models/Book.model");

module.exports = {
  getHomeData: async (req, res) => {
    try {
      const authors = await AuthorModel.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "author",
            as: "books",
          },
        },
        {
          $addFields: {
            books: { $size: "$books" },
          },
        },
      ])
        .sort({ books: -1 })
        .exec();

      const publishers = await PublisherModel.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "publisher",
            as: "books",
          },
        },
        {
          $addFields: {
            books: { $size: "$books" },
          },
        },
      ])
        .sort({ books: -1 })
        .exec();

      const categories = await CategoryModel.aggregate([
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "category",
            as: "books",
          },
        },
        {
          $addFields: {
            books: { $size: "$books" },
          },
        },
      ])
        .sort({ books: -1 })
        .exec();

      const books = await BookModel.find({ featured: true })
        .limit(10)
        .populate("author")
        .exec();

      const booksCategories = await CategoryModel.aggregate([
        {
          $match: { featured: true },
        },
        {
          $lookup: {
            from: "books",
            localField: "_id",
            foreignField: "category",
            as: "books",
          },
        },
        {
          $unwind: {
            path: "$books",
          },
        },
        {
          $lookup: {
            from: "authors",
            localField: "books.author",
            foreignField: "_id",
            as: "books.author",
          },
        },
        {
          $unwind: {
            path: "$books.author",
          },
        },
        {
          $group: {
            _id: "$_id",
            books: {
              $push: "$books",
            },
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $unwind: {
            path: "$categories",
          },
        },
        {
          $addFields: {
            "categories.books": "$books",
          },
        },
        {
          $replaceRoot: {
            newRoot: "$categories",
          },
        },
      ]).exec();

      const lstAuthors = await AuthorModel.find({}).exec();
      const lstPublishers = await PublisherModel.find({}).exec();
      const lstCategories = await CategoryModel.find({}).exec();

      res.status(200).json({
        featuredAuthor: authors,
        featuredPublisher: publishers,
        featuredCategories: categories,
        featuredBooksCategories: booksCategories,
        featuredBooks: books,
        lstAuthors,
        lstPublishers,
        lstCategories,
      });
    } catch (error) {
      res.status(500).send("Lấy dữ liệu thất bại");
    }
  },
};
