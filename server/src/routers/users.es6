/**
 * Module for users routes
 * @module routers/users
 */

const express = require('express');

const usersController = require('../controllers/users.es6');
const middleware = require('../services/middleware.es6');

const router = express.Router();

/** get list users */
router.get('/', usersController.getUsers);

/** get info for a single user */
router.get('/:id', usersController.getUser);

// delete a user
router.get('/:id/delete', usersController.deleteUser);

/** POST a new user */
router.post('/create', usersController.createUser);

// /** Update user */
// router.put('/users', middleware.checkToken, usersController.updateUser);

/**
 * Users module routes
 * @exports routers/users
 */
module.exports = router;
