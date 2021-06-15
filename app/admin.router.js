const { buildAuthenticatedRouter } = require("admin-bro-expressjs");

const ADMIN = {
  email: process.env.DB_AdminEmail,
  password: process.env.DB_AdminPassword,
};

const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(admin, {
    authenticate: async (email, password) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN;
      }
      return null;
    },
    cookieName: "adminbro",
    cookiePassword: "somePassword",
  });
  return router;
};

module.exports = buildAdminRouter;
