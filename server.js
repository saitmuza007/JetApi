
const express = require("express");
const cors = require("cors");
const mongoose=require('mongoose')
const isAuth=require('./middleware/is-auth')
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(isAuth)
const db = require("./config/db.config");
mongoose
  .connect(`${db.URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");

  })
  .catch(err => {
    console.error("Connection error", err);
  });

  require('./routes/user.routes')(app);
  require('./routes/contact.routes')(app);
  require('./routes/restricted.routes')(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Jetransit" });
});

const PORT = process.env.PORT || 8083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
