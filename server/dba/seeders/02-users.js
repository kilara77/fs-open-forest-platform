const users = [
  {
    id: 1,
    name: 'Brian Davidson',
    role: 'user',
    email: 'bdavidson@cynerge.com',
    forests: ["name: 'forest1', access: 'write'", "name: 'forest2', access: 'read'"],
    created: 'now()',
    updated: 'now()'
  }
];

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('users', users);
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('users');
  }
};
