'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Super Admin',
        email: 'superadmin@homespace.vn',
        password: hashedPassword,
        phone: '0900000001',
        role: 'superadmin',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Quản trị viên',
        email: 'admin@homespace.vn',
        password: hashedPassword,
        phone: '0900000002',
        role: 'admin',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Biên tập viên',
        email: 'editor@homespace.vn',
        password: hashedPassword,
        phone: '0900000003',
        role: 'editor',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Nguyễn Văn A',
        email: 'user@homespace.vn',
        password: hashedPassword,
        phone: '0900000004',
        role: 'user',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
