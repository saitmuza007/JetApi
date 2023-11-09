const controller = require("../controllers/user.controller");
const verifySignUp = require("../middleware/verifySignup");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/getAllUsers",
    controller.getAllUser
  );
  app.get(
    "/api/getUserById/:id",
    controller.getById
  );

    app.post("/api/dataPost",[verifySignUp.checkDuplicateEmail],controller.userData)

    app.post("/api/dataAccess",controller.accessPage)
  
  // app.put("/api/updateUser/:id",controller.updateById)

  // app.delete("/api/deleteuser/:id",controller.deleteById)
};
