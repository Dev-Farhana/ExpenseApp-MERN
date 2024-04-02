const userModel = require("../models/userModel");

const registerController = async(req,res) =>{
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
       res.status(200).json(`User Register Successfully! , ${newUser}`);

    } catch (error) {
        res.status(400).json(`Login not success ;/`);
        console.log(`err==> ${error}`);
    }
}

const loginController = async(req,res) =>{
    try {
      const {email,password} = req.body;
      const user =   await userModel.findOne({email,password});
      if(!user) return res.status(404).json("No user Found");
      res.status(200).json(user);

    } catch (error) {
        res.status(400).json("Login not success :/")
        console.log(`err==> ${error}`);
    }
}
module.exports = {loginController , registerController };