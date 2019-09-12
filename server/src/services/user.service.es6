/**
 * Module for User service functions
 * @module services/user-service
 */
const moment = require('moment-timezone');

const userService = {};

/**
 * @function translateForestFromDatabaseToClient - function to translate database model to JSON object
 * @param {Object} input - user data from database
 * @return {Object} - formatted data object
 */
userService.translateUserFromDatabaseToClient = (input) => {

  return {
    id: input.id,
    name: input.name,
    email: input.email,
    role: input.role,
    forests: input.forests
  };
};

module.exports = userService;
