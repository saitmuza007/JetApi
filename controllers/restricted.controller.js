
const Restricted = require("../models/restrictedcontent")

exports.postFiles = async(req, res) => {
  try{
    if(!req.isAuth)
{
    res.status(404).json({message:"Unauthenticated , Kindly Login"})
}
else if (req.isAuth && req.identity === "USER") {

      res.status(400).json({message:"Resource Accessible To Admin Only !"})
  }

  else{

    const restrictedData = new Restricted({
      url:req.body.url
      })


  
    await restrictedData.save().then((restr_data) => {
      res.status(200).json({data:restr_data})
    })
  
}
  }
  catch(err){
    res.status(400).json({message:"Error in saving file"+err})
  }
}
exports.getAllfiletData=(req,res,next)=>
{

if(!req.isAuth)
{
    res.status(404).json({message:"Unauthenticated , Kindly Login"})
}

else{

  Restricted.find().exec().then((data,err)=>
  {
   if(!err)
   {
      res.status(200).json({data:data});
   }
   else{
    res.status(404).send("No Data Found")
   }
  })
}

}

// exports.getContactById=(req,res,next)=>
// {
    
// if(!req.isAuth)
// {
//     res.status(404).send("Unauthenticated , Kindly Login")
// }
// else
// {
//   const id=req.params.id
//   Contact.findById(id).exec().then((data)=>{
//    res.status(200).json({data:data});
// }

// ).catch(err=>
//     {
//         res.status(404).send("No such Record Exists",err)
//     })
// }
// }

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
