

/**
 * Module for christmas tree public API to retrieve forests
 * @module controllers/chrismtmas-tree/forests
 */

const logger = require('../services/logger.es6');
const userModel = require('../models/users.es6')
const userService = require('../services/user.service.es6');

const users = {};

/**
 * @function getUsers - API function to get all forests
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
users.getUsers = (req, res) => {
  userModel
    .findAll({
      attributes: ['id', 'name', 'email', 'role', 'forests'],
      order: [['id', 'ASC']]
    })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

/**
 * @function getUser - API function to get one forest by the forest abbreviation
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
users.getUser = (req, res) => {
  userModel.users
    .findOne({
      where: {
        id: req.params.id
      }
    })
    .then((app) => {
      if (app) {
        res.status(200).json(userService.translateUserFromDatabaseClient(app));
      } else {
        res.status(404).send();
      }
    })
    .catch((error) => {
      logger.error(`ERROR: ServerError: user controller gertUserr error for user ${req.params.id}`, error);
      res.status(400).json(error);
    });
};

module.exports = users;
