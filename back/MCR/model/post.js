import {Schema, mongoose} from 'mongoose';
import { type } from 'os';

const postSchema = new mongoose.Schema({
    author:[{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name:{
            type:String
        },
    }],
    title:{
        type:String,
        // required: true
    },
    description:{
        type:String,
        // required: true
    },
    company:{
        type:String,
        // required: true
    },
    salary:{
        type: Number,
        // required: true
    },
    location:{
        type:String,
        // required: true
    },
    

}, {timeStamp:true});

const Post = mongoose.model('Post', postSchema);
export default Post;