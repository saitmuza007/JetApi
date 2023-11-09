const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber:{
    type:String,
    required:true
  }
, company:{
  type:String,
  required:true
},
position:{
  type:String,
  required:true
},
street:{
  type:String,
  required:true
},
suburb:{
  type:String,
  required:true
},
city:{
  type:String,
  required:true
},
country:{
  type:String,
  required:true
},
password: {
  type: String,
  required: true,
},
countrycode:{
  type:String,
  required:true
},
postcode:{
  type:String,
  required:true
},
identity:{
  type:String,
  required:true,
  default:"USER"
},

  dataDate: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("User", userSchema);
