const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;

const restrictedcontentSchema = new Schema({
  url:{
    type:String,
    required:true
  }
});

module.exports = mongoose.model("Restricted", restrictedcontentSchema);
