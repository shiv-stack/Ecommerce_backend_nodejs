const CategoryModel = require("./../models/category_model");
const CategoryController = {
  createCategory: async function (req, res) {
    try {
      const categoryData = req.body;
      const newCategory = new CategoryModel(categoryData);
      await newCategory.save();
      return res.json({ success: true,data:newCategory, message: "Category Created!" });
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
  fetchcAllategory: async function (req, res) {
    try {
        const categories = await CategoryModel.find();
        return res.json({ success: true,data:categories,});
     
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
  fetchCategoryById: async function (req, res) {
    try {
       const id =  req.params.id;
        const foundcategories = await CategoryModel.findById(id);

        if(!foundcategories){
            return res.json({ success: false, message: "Category not found!" });

        }
        return res.json({ success: true,data:foundcategories,});
     
    } catch (ex) {
      return res.json({ success: false, message: ex });
    }
  },
};
module.exports = CategoryController;
