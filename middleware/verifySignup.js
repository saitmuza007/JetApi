
const User = require('../models/user')

checkDuplicateEmail = async(req, res, next) => {
  try{
  await User.findOne({
    email:req.body.email
  }).exec().then((user)=>
  {
    if (user) {
      res.status(400).send({ message: "Failed!  Email is already used" });
      console.log(user)
      return;
    }
    next();

   
}).catch((err)=>
{
  res.status(500).send({ message: err });
        return;
})}
catch(err)
{res.status(500).send({ message: err });
return;

}}

// checkDuplicateUserNameorEmail = async(req, res, next) => {
//   try{
//   await account.findOne({
//     email:req.body.email
//   }).exec().then((user)=>
//   {
//     if (user) {
//       res.status(400).send({ message: "Failed!  The associated email already has an account" });
//       console.log(user)
//       return;
//     }
//     next();

   
// }).catch((err)=>
// {
//   res.status(500).send({ message: err });
//         return;
// })}
// catch(err)
// {res.status(500).send({ message: err });
// return;

// }}



const verifySignUp = {
  checkDuplicateEmail,

};

module.exports = verifySignUp;