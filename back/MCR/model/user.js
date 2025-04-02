import bcryptjs from 'bcryptjs';
import {Schema, mongoose} from 'mongoose';


const userSchema = new mongoose.Schema({
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    title:{
        type:String,
        // required: true
    },
    aboutMe:{
        type:String,
        // required: true
    },
    company:{
        type:String,
        // required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    saved:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    
})

const User = mongoose.model('User', userSchema);
export default User;