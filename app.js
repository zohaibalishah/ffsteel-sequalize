var createError = require('http-errors');
require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Sequelize, DataTypes } = require('sequelize');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER_NAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST_NAME,
    port: process.env.DATABASE_PORT,
    // logging: true,
    dialect:
      'mssql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('connected');
  })
  .catch((e) => {
    console.log('error', e);
  });

// sequelize.sync({alter:true}).then(()=>{
//   console.log('created ')
// })

const NodejsUser = sequelize.define(
  'NodejsUser',
  {
    // uuid: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    // },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.STRING,
    }
    
  },
  {
    timestamps: true,
  }
);
// NodejsUser.drop()
// .then(()=>{
//   console.log('dd')
// })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/adduser', async (req, res) => {
  try {
    const { first_name, lastName, email, password, dob } = req.body;
    const result = await NodejsUser.create({
      firstName: first_name,
      email,
    });
    return res.json({ message: 'data inserted', result });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

app.post('/addusers', async (req, res) => {
  try {
    const users = [
      {
        firstName: 'iPhone 9',
        lastName: 'An apple mobile which is nothing like apple',
        password: 549,
        email: 'Apple',
        dob:"26-10-2002"
      },
      {
        firstName: 'Samsung Galaxy Book',
        lastName: 'Mega ',
        password: 1499,
        email: 'Samsung',
        dob:"26-10-2002"
      },
      {
        firstName: 'Microsoft Surface Laptop 4',
        lastName: 'Mega ',
        password: 1499,
        email: 'Microsoft Surface',
        dob:"26-10-2002"

      },
      {
        firstName: 'Infinix INBOOK',
        lastName: 'Mega ',
        password: 1099,
        email: 'Infinix',
        dob:"26-10-2002"

      },
      {
        firstName: 'HP Pavilion 15-DK1056WM',
        password: 1099,
        lastName: 'Mega ',
        email: 'HP Pavilion',
        dob:"26-10-2002"

      },
      {
        firstName: 'perfume Oil',
        password: 1099,
        lastName: 'Mega ',
        email: 'Impression of Acqua Di Gio',
        dob:"26-10-2002"

      },
    ];
    const result = await NodejsUser.bulkCreate(users);
    return res.json({ message: 'data inserted', result });
  } catch (e) {
    return res.json({ message: e });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await NodejsUser.findAll({
      // attributes:['email',['firstName','name']],
      attributes: { exclude: ['password'] },
      // where:{email:'salman@gmail.com'}
      order: [['id', 'ASC']],
    });
    return res.json({ message: 'data inserted', result });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    await NodejsUser.destroy({
      where: { id: req.params.id },
    });
    return res.json({ message: 'data deleted', id: req.params.id });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    await NodejsUser.update(req.body, {
      where: { id: req.params.id },
    });
    return res.json({ message: 'data updated', id: req.params.id });
  } catch (e) {
    return res.json({ message: e.message });
  }
});

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
