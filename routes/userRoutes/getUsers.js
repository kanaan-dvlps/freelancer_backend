const router = require('express').Router();
const ODMMamager = require('../../helpers/ODMManager');

// ! ------------------------
/*
  ? @VPS Route      GET 5.253.25.222:3000/api/users
  ? @Local Route    GET http://localhost:3000/api/users
  ? @description    user info route
  ? @Access         Admin
  * @Response       code: 200, data: all users
*/

// ! ########### Route Module ###########

router.get('/users', (req, res, next) => {
  const Manager = new ODMMamager();
  Manager.getEntity()
    .then(data => {res.status(200).json({data})})
    .catch(error => {res.status(401).json({error: error.message})});
});

// ! ########### Route Module ###########

// ! ------------------------

module.exports = router;