const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const ODM = require('mongoose');
const ENV = require('./Configs/env');

const app = express();

// ! ##### Middlewares #####
// ? -----------------------

// * Cross Origin Requests Middleware
app.use(cors());

// * bodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// *passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// ? route files
const registrationModule = require('./routes/registrationRoute/registration');
const getUsers = require('./routes/userRoutes/getUsers');
const getUser = require('./routes/userRoutes/getUser');

// ? router middleware
app.use('/api', registrationModule);
app.use('/api', getUsers);
app.use('/api', getUser);

// ? -----------------------

// ! ##### Server #####
// ? -----------------------

app.listen(ENV.PORT, () => {
  ODM.set('useNewUrlParser', true);
  ODM.set('useFindAndModify', false);
  ODM.set('useCreateIndex', true);
  ODM.set('useUnifiedTopology', true);
  ODM.connect(ENV.MONGODB_URI);
  
  console.log(`\n\x1b[1m\x1b[33m## SERVER STRATED ON PORT:\x1b[0m\x1b[1m \x1b[32m${ENV.PORT} ## \x1b[0m`);
 
  console.log(`\x1b[1m\x1b[33m## ADDRESS:\x1b[0m\x1b[1m \x1b[32m${ENV.URL} ## \x1b[0m \n`);

  ODM.connection.on('error', error => {
    console.log(`\x1b[41m\x1b[1mODM error\x1b[0m`, error);    
  });

  console.log(`\x1b[34m\x1b[1mconnection to ODM...\x1b[0m`);
  ODM.connection.on('connected', () => {
    console.log(`\x1b[34m\x1b[1msuccessfully connected to ODM!\x1b[0m`);
  });

});

// ? -----------------------
