const users = [
  {
    id: 1,
    name: 'Brian Davidson',
    role: 'admin',
    email: 'bdavidson@cynerge.com',
    forests: ['{"name": "forest1", "access": "write"}', '{"name": "forest2", "access": "read"}'],
    created: 'now()',
    updated: 'now()'
  }, {
    id: 2,
    name: 'Mike Laney',
    role: 'admin',
    email: 'mlaney@cynerge.com',
    forests: ['{"name": "forest1", "access": "write"}', '{"name": "forest2", "access": "read"}', '{"name": "forest3", "access": "read"}', '{"name": "forest4", "access": "read"}'],
    created: 'now()',
    updated: 'now()'
  }, {
    id: 3,
    name: 'Test User',
    role: 'user',
    email: 'test@test.com',
    forests: ['{"name": "forest8", "access": "read"}'],
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
