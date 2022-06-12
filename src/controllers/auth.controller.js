const BookModel = require("../models/Book.model");
const CartModel = require("../models/Cart.model");
const UserModel = require("../models/User.model");
const { generateToken, verifyToken } = require("../utils/accesstoken");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email }).exec();
      if (!user) {
        return res.status(400).send("Không tìm thấy tài khoản");
      }
      if (!user.authenticate(password)) {
        return res.status(400).send("Mật khẩu không chính xác");
      }

      const accessToken = generateToken(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const refreshToken = generateToken(
        { _id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "365d" }
      );

      const currentUser = await UserModel.findOne({ _id: user._id })
        .select("-password")
        .select("-salt")
        .exec();

      if (!currentUser.status) {
        return res.status(500).send("Tài khoản đã bị khóa");
      }

      return res.status(200).json({
        accessToken,
        refreshToken,
        user: currentUser,
      });
    } catch (error) {
      return res.status(500).send("Đăng nhập thất bại");
    }
  },
  register: async (req, res) => {
    try {
      const { email, name, password } = req.body;
      const userExist = await UserModel.findOne({ email }).exec();
      if (userExist) {
        return res.status(400).send("Địa chỉ email đã tồn tại");
      }
      const user = await new UserModel({ email, name, password }).save();

      const currentUser = await UserModel.findOne({ _id: user._id })
        .select("-password")
        .select("-salt")
        .exec();

      return res.status(201).json(currentUser);
    } catch (error) {
      return res.status(500).send("Đăng ký thất bại");
    }
  },
  getCarts: async (req, res) => {
    try {
      const cart = await CartModel.findOne({
        user: req.params.id,
      })
        .populate(["books.book"])
        .exec();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).send("Lấy giỏ hàng thất bại");
    }
  },
  addToCart: async (req, res) => {
    const { cart } = req.body;

    let books = [];

    const cartData = await CartModel.findOne({
      user: cart.user,
    });

    if (cartData) {
      cartData.remove();
    }

    for (let i = 0; i < cart.books.length; i++) {
      let object = {};
      object.book = cart.books[i].book._id;
      object.quantity = cart.books[i].quantity;

      let { price, priceSale } = await BookModel.findById(
        cart.books[i].book._id
      )
        .select("price")
        .select("priceSale")
        .exec();
      object.price =
        (priceSale > 0 ? priceSale : price) * cart.books[i].quantity;
      books.push(object);
    }

    let cartTotal = books.reduce((total, current) => {
      return total + current.price;
    }, 0);

    let newCart = await new CartModel({
      books,
      total: cartTotal,
      user: cart.user,
    }).save();

    const totalCart = await CartModel.findOne({
      user: cart.user,
    }).exec();

    res.json({ total: totalCart.books.length });
  },
};
