

/**
 * Module for users API to retrieve openforest users
 * @module controllers/users
 */

const logger = require('../services/logger.es6');
const userModel = require('../models/users.es6')
const userService = require('../services/user.service.es6');
const util = require('../services/util.es6');
const uuid = require('uuid/v4');

const users = {};

/**
 * @function getUsers - API function to get all users
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
users.getUsers = (req, res) => {
  userModel.findAll({
      attributes: ['id', 'name', 'email', 'role', 'forests'],
      order: [['id', 'ASC']]
    })
    .then((results) => {
      if (results) {
        res.status(200).json(results);
      } else {
        logger.error("404 from getUsers")
        res.status(404).send();
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};

/**
 * @function getUser - API function to get one user by id
 * @param {Object} req - http request
 * @param {Object} res - http response
 */
users.getUser = (req, res) => {
  userModel.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((user) => {
      if (user) {
        res.status(200).json(userService.translateUserFromDatabaseToClient(user));
      } else {
        logger.error('404 from getUser')
        res.status(404).send();
      }
    })
    .catch((error) => {
      logger.error(`ERROR: ServerError: user controller getUser error for user ${req.params.id}`, error);
      res.status(400).json(error);
    });
};

users.createUser = async (req, res) => {
  util.logControllerAction(req, '  users.create  ', req.body);
  userModel
    .findAll({
      attributes: ['id', 'name', 'email', 'role', 'forests'],
      order: [['id', 'ASC']]
    })
    .then((results) => {
      if (results) {
        userModel.create({
          id: results.length + 1,
          name: req.body.name,
          role: req.body.role,
          email: req.body.email,
          forests: req.body.forests
        }).then((user) => {
          res.status(200).json(user)
        }).catch((error) => {
          res.status(500).json(error)
          util.handleErrorResponse(error, res, '  createUser#end  ');
        })
      } else {
        logger.error("404 from getUsers")
        res.status(404).send();
      }
    })
    .catch((error) => {
      res.status(400).json(error);
    });

};

users.deleteUser = (req, res) => {
  userModel.destroy({
    where: {
      fileId: req.params.id
    }
  })
    .then(() => {
      util.logControllerAction(req,
        'tempOutfitter.deleteFile',
        { updatedAt: new Date().toDateString() });
      return res.status(204);
    })
    .catch((error) => {
      logger.error(`Failure to delete file ${req.params.id}`);
      util.handleErrorResponse(error, res, 'deleteFile#end');
    });
};

module.exports = users;
