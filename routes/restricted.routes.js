const controller = require("../controllers/restricted.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/getAllFiles",
    controller.getAllfiletData,
  );
  app.post(
    "/api/postFiles",
    controller.postFiles
  );

  
  // app.put("/api/updateUser/:id",controller.updateById)

  // app.delete("/api/deleteuser/:id",controller.deleteById)
};
