const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
require('dotenv').config();

const ControllerAuth = require('../controllers/auth');
const Shared = require('../../shared/shared')
const Middleware = require('../middlewares/middlewares')

//Registro de usuarios // User register 
router.post('/register', Middleware.charactersEmail, Middleware.validateUser, ControllerAuth.register)

//Login de usuario // User Login
router.post('/login' , Middleware.validateLogin ,ControllerAuth.login);//,Shared.isSuspended

module.exports = router;