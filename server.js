const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const AdminBro = require('admin-bro');
const options = require('./app/admin.options');
const buildAdminRouter = require('./app/admin.router');
const db = require("./app/models");
const admin = new AdminBro(options);
const router = buildAdminRouter(admin);
app.use(admin.options.rootPath, router);


db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//permet d'afficher les images sur le feed
app.use('/app/images', express.static('app/images'))

require("./app/routes/user.routes")(app);
require("./app/routes/gif.routes")(app);
require("./app/routes/comment.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});