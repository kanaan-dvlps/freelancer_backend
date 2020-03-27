const router = require('express').Router();
const joi = require('@hapi/joi');
const DBManager = require('../../helpers/ODMManager');

// ! ------------------------
/*
  ? @VPS Route      GET 5.253.25.222:3000/api/registration      
  ? @Local Route    GET http://localhost:3000/api/registration
  ? @description    user registration route
  ? @Access         public
  * @Response       code: 201, data: new user
  
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

router.post('/registration', (req, res, next) => {
  // res.status(200).send({message: 'success!'});
  
  const { email, username, password, role, token } = req.body;
  const validateSchema = joi.object({
    email: joi.string().required(),
    username: joi.string().optional(),
    password: joi.string().required().min(8),
    role: joi.string().optional(),
    token: joi.string().optional()
  });

  // ? validate the schema and send errors if available
  if (validateSchema.validate(req.body).error !== undefined) {
    return res.status(401).json({validationErrorMessage: validateSchema.validate(req.body).error.message});
  }

  const Manager = new DBManager();
  Manager.addEntity(email, username, password, role, token)
    .then(data => res.status(201).json({data})).catch(error => console.log(error));
});

// ! ########### Route Module ###########

// ! ------------------------

module.exports = router;