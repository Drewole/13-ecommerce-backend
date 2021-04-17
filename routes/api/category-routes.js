const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  
  try {
    Category.findAll().then((categoryData) => {
    res.json(categoryData);
    include: [{model: Product, Through: Category }]
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
});
  // find all categories
  // be sure to include its associated Products

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{ 
      const categoryData = await Category.findByPk(req.params.id);
      if(!categoryData) {
          res.status(404).json({message: 'No category with this id!'});
          return;
      }
      const cat = categoryData.get({ plain: true });
      res.render('dish', dish);
    } catch (err) {
        res.status(500).json(err);
    };     
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
