
const User = require("../models/user")
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const authConfig = require("../config/auth.config");
exports.userData = async(req, res) => {
  try{

    const userData = new User({
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      email:req.body.email,
      // position:req.body.position,
      organisation:req.body.organisation,
      // street:req.body.street,
      // suburb:req.body.suburb,
      // city:req.body.city,
      // country:req.body.country,
      // countrycode:req.body.countrycode,
      // postcode:req.body.postcode,
      // contactNumber:req.body.contactNumber,password:bcrypt.hashSync(req.body.password, 8)
      })


  
    await userData.save().then((user_data) => {
      res.status(200).json({data:user_data})
    })
  
    
  }
  catch(err){
    res.status(400).json({message:"Error in saving data"+err})
  }
}
exports.getAllUser=(req,res,next)=>
{

if(!req.isAuth)
{
    res.status(404).send("Unauthenticated , Kindly Login")
}
else if (req.isAuth && req.identity === "USER") {

      res.status(400).json({message:"Resource Accessible To Admin Only !"})
  }
else{

  User.find().exec().then((user,err)=>
  {
   if(!err)
   {
      res.status(200).json({data:user});
   }
   else{
    res.status(404).send("No Data Found")
   }
  })
}

}

exports.getById=(req,res,next)=>
{
    
if(!req.isAuth)
{
    res.status(404).send("Unauthenticated , Kindly Login")
}
else
{
  const id=req.params.id
  User.findById(id).exec().then((data)=>{
   res.status(200).json({data:data});
}

).catch(err=>
    {
        res.status(404).send("No such Record Exists",err)
    })
}
}

// exports.updateById=async(req,res,next)=>
// {
    
// if(!req.isAuth)
// {
//     res.status(404).send("Unauthenticated , Kindly Login")
// }
// else{
    
//   const id=req.params.id

//   const fetchedUser = await User.findOne({_id:id ,isDeleted:false});
//   if(fetchedUser)
//   {
//       const updated = await User.findByIdAndUpdate(fetchedUser.id, {
//         $set: {
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//           email: req.body.email,
//           userLink:req.body.userLink
//         },
//       });
//     if(updated)
//     {
//       res.status(200).json({data:updated})
//     }
//     else
//     {
//       res.status(400).send("Error in Updating")
//     }
//   }
//   else{
//     res.status(200).send("No such User Exists")
//   }
// }
// }

// exports.deleteById=async(req,res,next)=>
// {
        
// if(!req.isAuth)
// {
//     res.status(404).send("Unauthenticated , Kindly Login")
// }

// else if (req.isAuth && req.authority === "USER") {

//     res.status(400).json({message:"Resource Accessible To Admin Only !"})
// }

//   else{
//   const id=req.params.id;
//   const fetchedUser = await User.findOne({ _id:id});
//   if (!fetchedUser) {
//    res.status(404).send("No Such User Exists");
//   } else {
//     const deleted = await User.findByIdAndUpdate(fetchedUser.id,{
//       $set: {
//         isDeleted:true
//       },

//     });
//     res.status(200).json({data:deleted})
//   }
// }
// }


exports.accessPage = async(req, res) => {

  try{
    User.findOne({
      email:req.body.email
    }).exec().then((data)=>
    {
      if(!data)
      {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
         
          message: "Invalid Password!"
        });
      }
      
       var token = jwt.sign({ id: data.id , email : data.email,identity:data.identity,name:data.firstName}, authConfig.secret, {
        expiresIn: 86400 // 24 hours
      });

     
    

      res.status(200).json({
        id:data._id, firstName:data.firstName,
        email : data.email,
        identity:data.identity,
        accessToken:token
       

      });
    });
  

}
catch(err)
{
  if (err) {
    res.status(500).json({ message: err });
    return;
  }
}
}
