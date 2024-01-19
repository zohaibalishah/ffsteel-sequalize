var express = require('express');
var router = express.Router();
const Products = require('../model/Products');
const NodejsUser = require('../model/Users');


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints for Products
 */
router.post('/add', async (req, res) => {
  try {
    const result = await Products.create(req.body);
    return res.json({ message: 'data inserted', result });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await Products.findAll({
        include:NodejsUser
    });
    return res.json({ message: 'data ', result });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await Products.destroy({
      where: { id: req.params.id },
    });
    return res.json({ message: 'data deleted', id: req.params.id });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

module.exports = router;
