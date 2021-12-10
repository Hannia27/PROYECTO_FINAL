const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  passReqToCallback: true
})); 

router.get('/signin', (req, res, next) => {
  res.render('signin');
});


router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/profile',
  failureRedirect: '/signin',
  passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/profile',isAuthenticated, (req, res, next) => {
  res.render('profile');
});


router.get('/control', (req, res, next)=>{
  res.render('control');
});

router.get('/informacion', (req, res, next)=>{
  res.render('informacion');
});

router.get('/productos1', (req, res, next)=>{
  res.render('productos1');
});

router.get('/productos2', (req, res, next)=>{
  res.render('productos2');
});

router.get('/inicio', (req, res, next)=>{
    res.render('inicio');
});


router.get('/productos', (req, res, next)=>{
    res.render('productos');
});

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;