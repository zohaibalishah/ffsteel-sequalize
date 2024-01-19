var express = require('express');
var router = express.Router();
const NodejsUser=require("../model/Users");
const Products = require('../model/Products');

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Endpoints for User
 */

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: add new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: firstname
 *               lastName:
 *                 type: string
 *                 description: lastname
 *               email:
 *                 type: string
 *                 description: email
 *             example:
 *               firstname: "string"
 *               lastname: "string"
 *               email: "string"
 *
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 first_name:
 *                   type: string
 *                   description: Auth token
 *                 lastname:
 *                   type: string
 *                   description: Refresh token
 *                 email:
 *                   type: string
 *                   description: API domain
 *                 password:
 *                   type: string
 *                   description: Token type
 *             example:
 *               firstname: "ali"
 *               lastname: ""
 *               email: ""
 *               password: ""
 *       400:
 *         description: Application fields are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Invalid clientId"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 0
 *                 message:
 *                   type: string
 *                   example: "Server error"
 *
 */
router.post('/add', async (req, res) => {
  try {
    const { first_name, lastName, email, password, dob } = req.body;
    const result = await NodejsUser.create({
      firstName: first_name,
      email,
      password,
    });
    return res.json({ message: 'data inserted', result });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

router.post('/addusers', async (req, res) => {
  try {
    const users = [
      {
        firstName: 'iPhone 9',
        lastName: 'An apple mobile which is nothing like apple',
        password: 549,
        email: 'Apple',
        dob: '26-10-2002',
      },
      {
        firstName: 'Samsung Galaxy Book',
        lastName: 'Mega ',
        password: 1499,
        email: 'Samsung',
        dob: '26-10-2002',
      },
      {
        firstName: 'Microsoft Surface Laptop 4',
        lastName: 'Mega ',
        password: 1499,
        email: 'Microsoft Surface',
        dob: '26-10-2002',
      },
      {
        firstName: 'Infinix INBOOK',
        lastName: 'Mega ',
        password: 1099,
        email: 'Infinix',
        dob: '26-10-2002',
      },
      {
        firstName: 'HP Pavilion 15-DK1056WM',
        password: 1099,
        lastName: 'Mega ',
        email: 'HP Pavilion',
        dob: '26-10-2002',
      },
      {
        firstName: 'perfume Oil',
        password: 1099,
        lastName: 'Mega ',
        email: 'Impression of Acqua Di Gio',
        dob: '26-10-2002',
      },
    ];
    const result = await NodejsUser.bulkCreate(users);
    return res.json({ message: 'data inserted', result });
  } catch (e) {
    return res.json({ message: e });
  }
});


/**
 * @openapi
 * /users/:
 *   get:
 *     description: return all users
 *     responses:
 *       200:
 *         description: return new user data
 */
router.get('/', async (req, res) => {
  try {
    const result = await NodejsUser.findAll({
      include:Products,
      attributes: { exclude: ['password'] },
      order: [['id', 'ASC']],
    });
    return res.json({ message: 'data inserted', result });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await NodejsUser.destroy({
      where: { id: req.params.id },
    });
    return res.json({ message: 'data deleted', id: req.params.id });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    await NodejsUser.update(req.body, {
      where: { id: req.params.id },
    });
    return res.json({ message: 'data updated', id: req.params.id });
  } catch (e) {
    return res.json({ message: e.message });
  }
});




router.get('/bypk', async (req, res) => {
  const result = await NodejsUser.findByPk(3, {
    attributes: ['firstName', 'email'],
  });
  return res.json({ result });
});


router.get('/count', async (req, res) => {
  const users = await sequelize.query('SELECT * FROM NodejsUsers');
  // const result=await NodejsUser.findAndCountAll()
  return res.json({ users: users[0], total: users[1] });
});

module.exports = router;
