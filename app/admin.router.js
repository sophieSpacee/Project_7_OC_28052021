const { buildAuthenticatedRouter} = require('admin-bro-expressjs');

const ADMIN = {
    email: 'admin@groupomania.com',
    password: 'adminPassword123',
    }

const buildAdminRouter = (admin) => {
    const router = buildAuthenticatedRouter(admin, {
         authenticate: async (email, password) => {
         if (ADMIN.password === password && ADMIN.email === email) {
           return ADMIN
         }
         return null
        },
        cookieName: 'adminbro',
  cookiePassword: 'somePassword',});
    return router;
}

module.exports = buildAdminRouter;

