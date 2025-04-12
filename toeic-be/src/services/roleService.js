const db = require("../models");
const Role = db.Role;

const roleService = {
  async getAllRoles() {
    return await Role.findAll();
  },

  async getRoleById(id) {
    return await Role.findByPk(id);
  },

  async createRole(data) {
    return await Role.create(data);
  },

  async updateRole(data) {
    const role = await Role.findByPk(data.id);
    if (!role) throw new Error("Role not found");
    return await role.update(data);
  },

  async deleteRole(id) {
    const role = await Role.findByPk(id);
    if (!role) throw new Error("Role not found");
    await role.destroy();
    return true;
  },
};

module.exports = roleService;
