const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
mongoose.connect(
  "mongodb+srv://user_shivam:user%40shivam@ecommerce.p0v0jbs.mongodb.net/ecommerce?retryWrites=true&w=majority"
);

//user routes
const UserRoutes = require("./routes/user_routes");

app.use("/api/user", UserRoutes);
//category routes
const CategoryRoutes = require("./routes/category_routes");

app.use("/api/category", CategoryRoutes);

//product routes
const ProductRoutes = require("./routes/product_routes");

app.use("/api/products", ProductRoutes);
//cart routes
const CartRoutes = require("./routes/cart_routes");

app.use("/api/cart", CartRoutes);

//order routes
const OrderRoutes = require("./routes/order_routes");

app.use("/api/order", OrderRoutes);

const PORT = 5000;

app.listen(PORT, function () {
  console.log("Server is running on port: ", PORT);
});

//users -> Model,Route and controller
