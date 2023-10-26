const CategoryRoutes = require('express').Router();

const CategoryController = require('./../controller/category_controller');
CategoryRoutes.get("/",CategoryController.fetchcAllategory);
CategoryRoutes.get("/:id",CategoryController.fetchCategoryById);
CategoryRoutes.post("/",CategoryController.createCategory);
module.exports = CategoryRoutes ;