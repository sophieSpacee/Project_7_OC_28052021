const AdminBro = require('admin-bro');
const adminBroSequelize = require('@admin-bro/sequelize');

AdminBro.registerAdapter(adminBroSequelize);
const db = require("./models");
const  options = {
    databases: [db],
};

module.exports = options;
