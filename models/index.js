// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

//TODO: I don't think any of this is correct. Need to ask questions tomorrow

// Products belongsTo Category
// Belongs to, use the second model listed, if hasMany its the first model in the phrase

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories have many Products
Category.hasMany(Product, {
  through: Category,
  as: 'related_products',
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(ProductTag, {
  through: ProductTag,
  as: 'related_products',
  foreignKey: 'tag_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(ProductTag, {
  through: Tag,
  as: 'related_products',
  foreignKey: 'product_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
