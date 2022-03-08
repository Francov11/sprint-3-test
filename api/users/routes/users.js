const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
require('dotenv').config();

const ControllerUsers = require('../controllers/users');
const Shared = require('../../shared/shared')

router.get('/list' ,Shared.isAuthenticated  ,ControllerUsers.findAll)//,Shared.isAdmin

router.put('/update/:id' ,Shared.isAuthenticated ,Shared.isAdmin ,ControllerUsers.update)

router.delete('/delete/:id' ,Shared.isAuthenticated ,Shared.isAdmin ,ControllerUsers.deleteUser)

module.exports = router;