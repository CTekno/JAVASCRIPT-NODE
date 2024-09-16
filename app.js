var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var sampledataRouter = require('./routes/sample_data');
var newuserRouter = require('./routes/newuser');

var app = express();

// Importar o cliente Supabase
var supabase = require('./supabaseclient');

// Carregar variáveis de ambiente
require('dotenv').config();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'TMIT',
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: true
}));

app.use(flash());

// Tornar o cliente Supabase disponível para os roteadores
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/sample_data', sampledataRouter);
app.use('/newuser', newuserRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
