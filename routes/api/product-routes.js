const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll({
      include: {model: Category},
    });
    if(!productData) {
          res.status(404).json({message: 'No Products Available'});
          return;
      };
    res.status(200).json(productData);
  } catch(err) {
    res.status(500).json(err);
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try{ 
      const productData = await Product.findByPk(req.params.id, {
        include: {model: Category},
      });
      if(!productData) {
          res.status(404).json({message: 'No product with this id!'});
          return;
      }
      res.json(productData);
    } catch (err) {
        res.status(500).json(err);
    };  
});

// CREATE new product
router.post('/', async (req, res) => { 

    try {
        const productData = await Product.create(req.body);

        res.status(200).json(productData);
    } catch (err) {
        res.status(400).json(err);
    }

});

// UPDATE product
router.put('/:id', async (req, res) => {
  // update product data
  try {
      const productData = await Product.update(
            {
                product_name: req.body.product_name, 
                price: req.body.price,
                stock: req.body.stock ,
                category_id: req.body.category_id         
            },
            {
                where:{
                    id: req.params.id,

            }
      });
      if(!productData) {
          res.status(404).json({message: 'No product with this id!'});
          return;
      }
      res.status(200).json(productData);
  } catch (err){
      res.status(500).json(err);  
  }

});

// DELETE product by id
router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
    try {
        const productData = await Product.destroy({
            where:{
                id: req.params.id
            },
        });
        if(!productData) {
          res.status(404).json({message: 'No product with this id!'});
          return;
      }
        res.status(200).json(productData);
    } catch (err){
        res.status(500).json(err);
    }
});

module.exports = router;
