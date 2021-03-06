const express = require('express');
const jwt = require('jsonwebtoken')
const passport = require('passport');
const router = express.Router();

const User = require('../../models/User');

router.post('/register', function(req, res) {
  var body = req.body,
      username = body.username,
      password = body.password,
      passwordConfirm = body.passwordConfirm;
  User.findOne({ username: username }, function(err, document) {
    if (err) { res.status(500).send('Error ocurred') }
    else {
      if (document) {
        { res.status(500).send('Username already exists - please try again') }
      } else if (password != passwordConfirm) {
        { res.status(500).send('Passwords do not match, please try again.')}
      } else {
        User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
          if(err) {
            console.log(err);
          }
          return res.redirect('/login');
        })
      }
    }
  })
})

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/'
}), function(req, res) {
  res.send('hello');
});

// router.post('/login', passport.authenticate('local', {
//   failureRedirect: '/login',
//   successRedirect: '/'
// }), function(req, res) {
//   const token = jwt.sign({
//     email: req.body.username
//   }, 'secretyKeykey', {
//     expiresIn: "1h"
//   });
//   console.log('log in success');
//   return res.status(200).json({
//     message: 'Auth successful',
//     token: token
//   })
// });

router.get('/logout', function(req, res) {
  req.logout();
  res.json({ message: 'true facts' });
})

router.get('/secret', function(req, res) {
  if (req.isAuthenticated()) {
    res.json({ isLoggedIn: 'true' })
  } else {
    res.json({ isLoggedIn: 'false' })
  }
})

module.exports = router;