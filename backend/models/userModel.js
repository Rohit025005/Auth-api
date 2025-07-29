import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"need to enter name"],
        minLength : 2,
        maxLength : 100
    },
    email: {
    type: String,
    required: [true, 'User Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
  },
  lastLogin:{
    type:Date,
    default:Date.now
  },
  isVerified:{
    type:Boolean,
    default:false
  },
    resetPasswordToken: String,
		resetPasswordExpiresAt: Date,
		verificationToken: String,
		verificationToken: Date,

},{timestamps:true}); 

const User = mongoose.model('User', userSchema);

export default User;