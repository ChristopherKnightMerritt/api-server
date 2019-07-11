'use strict';

const Roles = require('../auth/roles-model.js');

module.exports = (req, res, next) => {
  const superuser = {role: 'superuser', capabilities: ['create','read','update','delete','superuser']};
  const admin = { role: 'admin', capabilities: ['create', 'read', 'update', 'delete'] };
  const editor = { role: 'editor', capabilities: ['create', 'read', 'update'] };
  const user = { role: 'user', capabilities: ['read'] };

  [user, editor, admin, superuser].forEach(role => {
    Roles.findOne({ role: role.role })
      .then(result => {
        if (!result) {
          const newRole = new Roles(role);
          newRole.save().then(role => {
            // console.log(`${role.role} role added to database.`);
          });
        } else {
          // console.log(`'${role.role}' role present in database.`);
        }
      })
      .catch(console.error);
  });
};
