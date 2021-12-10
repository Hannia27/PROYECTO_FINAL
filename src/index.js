const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan'); 
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');



//Inicializaciones
const app = express();
require('./database');
require('./passport/local-auth');

// Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.listen(3000);

//Middlewears
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
  secret: 'misesionsecreta',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  //console.log(app.locals)
  next();
});


//Routes
app.use('/', require('./routes/index'));

//Incio de servidor 
console.log('SERVIDOR EN PUERTO',3000);

