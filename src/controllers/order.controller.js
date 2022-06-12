const CartModel = require("../models/Cart.model");
const OrderModel = require("../models/Order.model");

module.exports = {
  checkout: async (req, res) => {
    try {
      const checkout = await new OrderModel(req.body).save();
      const cartExit = await CartModel.findOne({ user: req.body.user });
      if (cartExit) {
        cartExit.remove();
      }
      res.status(201).json(checkout);
    } catch (error) {
      res.status(500).send("Đặt hàng thất bại");
    }
  },
  getOrdersNew: async (req, res) => {
    try {
      const orders = await OrderModel.find({ status: "new" })
        .populate("books.book")
        .exec();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).send("Lấy danh sách đơn hàng thất bại");
    }
  },
  getOrdersPending: async (req, res) => {
    try {
      const orders = await OrderModel.find({ status: "pending" })
        .populate("books.book")
        .exec();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).send("Lấy danh sách đơn hàng thất bại");
    }
  },
  getOrdersDone: async (req, res) => {
    try {
      const orders = await OrderModel.find({ status: "done" })
        .populate("books.book")
        .exec();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).send("Lấy danh sách đơn hàng thất bại");
    }
  },
  getOrdersRemove: async (req, res) => {
    try {
      const orders = await OrderModel.find({ status: "remove" })
        .populate("books.book")
        .exec();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).send("Lấy danh sách đơn hàng thất bại");
    }
  },
  updateOrderStatus: async (req, res) => {
    try {
      const order = await OrderModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: req.body.status,
          },
        },
        { new: true }
      ).exec();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).send("Cập nhật trạng thái thất bại");
    }
  },
};
