const users = [
  {
    name: 'Brian Davidson',
    role: 'admin',
    email: 'bdavidson@cynerge.com',
    forests: ['{"forest_name_short": "Arapaho and Roosevelt", "access": "write", "id": "1"}', '{"id": "2", "forest_name_short": "Flathead", "access": "read"}'],
    created: 'now()',
    updated: 'now()'
  }, {
    name: 'Mike Laney',
    role: 'admin',
    email: 'mlaney@cynerge.com',
    forests: ['{"id": "1", "forest_name_short": "Arapaho and Roosevelt", "access": "write"}', '{"id": "2", "forest_name_short": "Flathead", "access": "read"}', '{"id": "3", "forest_name_short": "Mt. Hood", "access": "read"}', '{"id": "4", "forest_name_short": "Shoshone", "access": "read"}'],
    created: 'now()',
    updated: 'now()'
  }, {
    name: 'Test User',
    role: 'user',
    email: 'test@test.com',
    forests: ['{"id": "8", "forest_name_short": "Deschutes", "access": "read"}'],
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
