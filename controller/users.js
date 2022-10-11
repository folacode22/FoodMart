const db = require('../models')
const User = db.user;
// const Op = db.Sequlize.Op;

exports.createUser = async (req,res)=>{
    const {username, email,address,role} = req.body;
    
      if (!(username && email)) {
        res.status(400).json({ message: "fields required" });
        return;
      }
      try {
        const user = await User.create({
            username,
            email,
address,
role
        })
        return res.status(201).json(user)
      } catch (error) {
        console.log(error);
        return res.status(500).json({message:'internal server error'})
      }
      
}


exports.completeRegister = async (req,res)=>{
    const id = req.params.google
 const finduser = await User.findByPK({
    where: id
 });
 if(!finduser){
    return res.status(400).json({message:'user not found'})
 };
 const upUser = await User.update(finduser)
 return res.status(202).json(upUser)
};

exports.findAllUser = async (req, res) =>{
    try{
    //     const id = req.params.username
    //   const user = await User.findOne({id: username })
    // if(user.role !== "admin"){
    //     return res.status(401).json({message:'Not authorized'})
    // }
     const data = User.findAll()
     return res.status(200).json(data)

    } catch (error) {
        return res
        .status(500)
        .json({ error: error.message, message: "internal server error" });
    }

};

exports.findUser = async(req, res)=>{
  try {
    const id = req.params.id
    const user = User.findByPK(id)
    return res.status(200).json(user)
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message, message: "internal server error" });
  }
}