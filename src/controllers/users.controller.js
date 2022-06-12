const UserModel = require("../models/User.model");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.find({}).exec();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send("Lấy danh sách người dùng thất bại");
    }
  },
  getUser: async (req, res) => {
    try {
      const users = await UserModel.findOne({
        _id: req.params.id,
      }).exec();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send("Lấy người dùng thất bại");
    }
  },
  createUser: async (req, res) => {
    try {
      const user = await new UserModel(req.body).save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send("Thêm người dùng thất bại");
    }
  },
  updateUser: async (req, res) => {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
      ).exec();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send("Cập nhật người dùng thất bại");
    }
  },
  updateUserStatus: async (req, res) => {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            status: !req.body.status,
          },
        },
        { new: true }
      ).exec();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send("Cập nhật trạng thái người dùng thất bại");
    }
  },
  updateUserRole: async (req, res) => {
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            isAdmin: !req.body.role,
          },
        },
        { new: true }
      ).exec();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).send("Cập nhật chức vụ người dùng thất bại");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = await UserModel.findOneAndDelete({
        _id: req.params.id,
      }).exec();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send("Xóa người dùng thất bại");
    }
  },
};
