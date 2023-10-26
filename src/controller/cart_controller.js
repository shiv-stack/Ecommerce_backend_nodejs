const CartModel = require("./../models/cart_model");

const cartController = {
  addToCart: async function (req, res) {
    try {
      const { product, user, quantity } = req.body;
      const foundCart = await CartModel.findOne({ user: user });

      // if cart not exist
      if (!foundCart) {
        const newCart = new CartModel({ user: user });
        newCart.items.push({
          product: product,
          quantity: quantity,
        });
        await newCart.save();
        return res.json({
          success: true,
          data: newCart,
          message: "Product added to cart!",
        });
      }

      //deleting the item if it already exists
      const deletedItem = await CartModel.findOneAndUpdate(
        { user: user, "items.product": product },
        { $pull: { items: { product: product } } },
        { new: true }
      );
      //if  cart already exist
      const updatedCart = await CartModel.findOneAndUpdate(
        { user: user },
        { $push: { items: { product: product, quantity: quantity } } },
        { new: true }
      ).populate("items.product");
      return res.json({
        success: true,
        data: updatedCart.items,
        message: "Product added to cart!",
      });
    } catch {
      return res.json({ success: false, message: ex });
    }
  },
  removeFromCart: async function (req, res) {
    try {
      const { user, product } = req.body;
      const updatedCart = await CartModel.findOneAndUpdate(
        { user: user },
        { $pull: { items: { product: product } } },
        { new: true }
      ).populate("items.product");
      
      return res.json({
        success: true,
        data: updatedCart.items,
        message: "Product removed from Cart",
      });
    } catch {
      return res.json({ success: false, message: ex });
    }
  },
  getCartForUser: async function (req, res) {
    try {
      const user = req.params.user;
      const foundcart = await CartModel.findOne({ user: user }).populate(
        "items.product"
      );
      if (!foundcart) {
        return res.json({ success: true, message: ex, data: [] });
      }
      return res.json({ success: true, data: foundcart.items });
    } catch {
      return res.json({ success: false, message: ex });
    }
  },
};
module.exports = cartController;
