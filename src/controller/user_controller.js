const UserModel = require("./../models/user_models");
const bcrypt = require("bcrypt");
const UserController = {
  createAccount: async function (req, res) {
    try {
      const userData = req.body;
      const newUser = new UserModel(userData);
      await newUser.save();

      return res.json({
        success: true,
        data: newUser,
        message: "user created ",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
  signIn: async function (req, res) {
    try {
      const { email, password } = req.body;
      const foundUser = await UserModel.findOne({ email: email });
      if (!foundUser) {
        return res.json({ success: false, message: "user not found" });
      }
      const passwordMatch = bcrypt.compareSync(password, foundUser.password);
      if (!passwordMatch) {
        return res.json({ success: false, message: "incorrect password" });
      }

      return res.json({ success: true, data: foundUser });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },

  updateUser: async function (req, res) {
    try {
      const userId = req.params.id;
      const updateData = req.body;
      const updatedUser = await UserModel.findOneAndUpdate(
        { _id: userId },
        updateData,
        { new: true }
      );
      if (!updatedUser) {
        throw "user not found!";
      }
      return res.json({
        success: true,
        data: updatedUser,
        message: "User Updated! ",
      });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};
module.exports = UserController;
