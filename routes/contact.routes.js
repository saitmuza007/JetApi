const controller = require("../controllers/contact.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/getAllContacts",
    controller.getAllContactData
  );
  app.get(
    "/api/getContactById/:id",
    controller.getContactById
  );

    app.post("/api/postContact",controller.contacts)
  
  // app.put("/api/updateUser/:id",controller.updateById)

  // app.delete("/api/deleteuser/:id",controller.deleteById)
};
