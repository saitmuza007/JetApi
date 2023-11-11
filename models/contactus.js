const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;

const contactusSchema = new Schema({
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true
 },
 subject:{
    type:String,
    required:true
 },

});

module.exports = mongoose.model("Contact", contactusSchema);
