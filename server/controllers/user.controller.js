const {User} = require('../models/user.model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Order } = require('../models/order.model');

module.exports.register = async(req, res) => {
    try{
        const existingUser = await User.findOne({email: req.body.email})
        if(existingUser){
            return res.status(400).json({msg: "email already exists"})
        }

    const newUser =  await User.create(req.body)
        
    const userToken = jwt.sign({id: newUser._id}, process.env.SECRET_KEY, {expiresIn:"7d"});        
    res.cookie("userToken", userToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict", //prevent csrf attacks
        secure: process.env.NODE_ENV === "production" 
    })
    res.json({msg: "success!", user: newUser})
    } catch (err){
        res.status(400).json(err)
    } 
    
    
}

module.exports.login = async(req, res) =>{
    const user = await User.findOne({ email: req.body.email});
    if(user === null){
        return res.sendStatus(400)
    }

    const correctPassword = await bcrypt.compare(req.body.password, user.password)
    if(!correctPassword) {
        return res.sendStatus(400)
    }
    const userToken = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY, {expiresIn: '7d'});

    res.cookie("userToken", userToken, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict", //prevent csrf attacks
        secure: process.env.NODE_ENV === "production" 
    })
    .json({msg: "success!"});
}

module.exports.getAllUsers = (req, res) =>{
    User.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
}

module.exports.getOneUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        
        if(!user) return res.status(404).json({msg:"User not found"})

        res.status(200).json({msg: "User was fetched correctly", user: user})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Error in fetching user", error: error.message})
    }
}

module.exports.logout = (req, res) =>{
    res.clearCookie('userToken');
    res.status(200).json({msg: "Logout successful!"})
}

module.exports.deleteOneUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = User.findById(userId)
        if(!user) return res.status(404).json({msg: `User with id: ${userId} is not found`})
        const deletedOrders = await Order.deleteMany({userId: userId})
        if (deletedOrders.deletedCount > 0) {
            console.log(`Deleted ${deletedOrders.deletedCount} orders for user with id: ${userId}`);
        }

        const deletedUser = await User.deleteOne(user)
        
        res.status(200).json({msg: "User was deleted successfully", user: deletedUser})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: "Error in deleting user", error: error.message})
    }
}

module.exports.deleteAll = async (req, res) => {
    try {
        await User.deleteMany({role: 'user'});
        res.clearCookie('userToken')
        res.json({ msg: "All users deleted successfully!" });
    } catch (err) {
        res.status(500).json({ error: "An error occurred while deleting users." });
    }
};

module.exports.giveTheUserTheirInfo = async (req, res) =>{
    const userId = req.user.id
    try {
        const user = await User.findById(userId)
        if(!user) return res.status(404).json({msg:"User not found"})
        res.status(200).json({msg: "User fetched successfully", user: user})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: 'error in fetching user'})
    }
}