const {User} = require('../models/user.model')

module.exports.isAdmin= async(req, res, next) =>{
    const userId = req.user.id
    const user = await User.findById(userId)
    if(user && user.role === 'admin'){
        return next()
    } else{
        return res.status(403).json({msg: "Access denied"})
    }
}