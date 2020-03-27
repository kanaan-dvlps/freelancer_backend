const router = require('express').Router();
const ODMManager = require('../../helpers/ODMManager');

// ! ------------------------
/*
  ? @VPS Route      GET 5.253.25.222:3000/api/user:id
  ? @Local Route    GET http://localhost:3000/api/user:id
  ? @description    user registration route
  ? @Access         public
  * @Response       code: 200, data: one user
*/

// ! ########### Route Module ###########

router.get('/user/:id', (req, res, next) => {
  const Manager = new ODMManager();
  Manager.getOneEnity({'_id': req.params.id})
    .then(data => res.status(200).json({data}))
    .catch(error => console.log(error));
});

// ! ########### Route Module ###########

// ! ------------------------

module.exports = router;