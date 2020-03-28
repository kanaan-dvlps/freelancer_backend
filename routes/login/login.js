const router = require('express').Router();
const joi = require('@hapi/joi');
const DBManager = require('../../helpers/ODMManager');
const Auth = require('../../helpers/Auth');

// ! ------------------------
/*
  ? @VPS Route      POST 5.253.25.222:3000/api/login      
  ? @Local Route    POST http://localhost:3000/api/login
  ? @description    user login route
  ? @Access         public
  * @Response       code: 200, data: user and token
  
  * mock data:
  * {
  *   "email": "kanaansci@gmail.com",
  *   "username": "kanaanJoon",
  *   "password": "12345678",
  *   "role": "",
  *   "token": ""
  * }
  
  ! validation rules:
  ! password must be at least 8 characters
*/

// ! ########### Route Module ###########

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  const validateSchema = joi.object({
    username: joi.string().optional(),
    password: joi.string().required().min(8)
  });

  // ? validate the schema and send errors if availabel
  if (validateSchema.validate(req.body).error !== undefined) {
    return res.status(401).json({validationErrorMessage: validateSchema.validate(req.body).error.message});
  }

  // ? working with DBManagaer and entities
  const Manager = new DBManager();
  Manager.getOneEnity({'username': username})
    .then(user => Auth.token(user)
      .then(token => res.json({user, token}))
      .catch(error => res.status(500).json({jwtError: error.message})))
    .catch(error => res.status(500).json({managerError: error.message}));
});

module.exports = router;