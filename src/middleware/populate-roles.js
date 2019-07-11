'use strict';
/**
 * Populate Roles Middleware
 * Populates each ACL role in the database on server start.
 * Credit to classmate Joseph Wolfe for coming up with the function this module is primarly based on.
 * @module src/middleware/populate-roles
 */

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
