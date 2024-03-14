import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require: [true, "Please provide username"],
        unique:true
    },
    email:{
        type:String,
        require: [true, "Please provide email"],
        unique:true
    },
    password:{
        type:String,
        require:[true, "Please provide password"],
    },
    isVerify:{
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
},{timestamps: true})

const User = mongoose.models.User || mongoose.model('User', userSchema)
// const User = mongoose.model('User', userSchema)

export default User