const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "First name must be at least 3 charecters long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Last name must be at least 3 charecters long"]
    },
    
    email: {
        type: String,
        required: [true, "Email is required ."],
        validate:{
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    
    password: {
        type: String,
        required: [true, "Password is required."],
        minlength: [8, "Password must be at least 8 charecters."],
    },
    role:{
        type: String,
        enum: ['user','admin'],
        default: 'user',
    }
    
    
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
.get( ()=> this._confirmPassword)
.set( value => this._confirmPassword = value)

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', "Password and confirm password must match")
    }
    next();
})

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next()
    })
    .catch(err => next(err))
})
module.exports.User = mongoose.model('User', UserSchema);
