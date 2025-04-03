import Post from "../model/post.js"
import User from "../model/user.js"

// create post
const createPost = async (req,res) => {
    const {title, description, salary, location, company} = req.body;
    // Get the body post
    const post = new Post(req.body);
    // find the user
    const user = await User.findById(req.user._id);

    if(!title || !description || !salary || !location || !company){
        return res.status(400).json({message: "Please fill up all fields."})
    }

    try {
        // post.author object, attach id and the name
        post.author = {_id: req.user._id, name: req.user.name}
        // user.posts object, push the post
        user.posts.push(post)
        // save it
        await post.save()
        await user.save()
        res.status(201).json({message:'Post created', post})
        
    } catch (error) {
        throw new Error(error)
    }
}

// get all posts
const findAll = async(req,res) => {
    const posts = await Post.find({})
    res.status(200).json({posts})
}

// get one post
const findPost = async (req,res) => {
    const {id} = req.params;
    const post = await Post.findById(id).populate('applicants')
    res.status(200).json({message:'Found', post})
    // console.log(post)
}   

// update post
const update = async (req, res) => {
    const {id} = req.params;
    const {title, description, salary, location, company} = req.body;
    const post = await Post.findById(id)

    try {
        if(!post){
            return res.status(404).json({message:`Post doesn't exist, or it was deleted.`})
        }
    
        if(post){
            post.title = title;
            post.description = description;
            post.location = location;
            post.salary = salary;
            post.company = company;
            await post.save()
            return res.status(200).json({message:`Post Updated Successfully!`, post})
        }
        
        
    } catch (error) {
        throw new Error(error)
    }

}

// delete post
const deletePost = async (req,res) => {
    const {id} = req.params;
    
    // id from the POST MODEL DATABASE | Look up the post
    const post = await Post.findById(id);
    // const postOwner = await User.findById(userPostId)
    const user = req.user;

    // If the post dont exist
    if(!post){
        res.status(404).json({message:`Post dont exist.`})
    }
    
    const postOwner = post.author[0]._id.equals(user._id)
    const userIsAdmin = user.isAdmin

    const deletion = async () => {
        // find the user
        const user = await User.findById(post.author[0]._id)
        // find the post
        // const postToDelete = postId._id

        // the filter method create a new array with a specific value
        // here, i'm excluding the id
        user.posts =  user.posts.filter(i => i != id)
        // save it with the new array
        await Post.findByIdAndDelete(id)
        await user.save()
    }

    if(userIsAdmin){
        deletion()
        return res.status(401).json({message:`Deleted as admin.`})
    } else if(!postOwner){
        return res.status(401).json({message:`You're not the owner of the post.`})
    } else {
        deletion()
        return res.status(200).json({message:'Post deleted successfully!'})
    
    }
    // Two ways to compare the id's
    // console.log(JSON.stringify(req.user._id) === JSON.stringify(userPostId))
    // console.log(!req.user._id.equals(userPostId));

}

const applyToJob = async(req,res) => {
    const {id} = req.params
    const post = await Post.findById(id)
    const user = await User.findById(req.user._id)
    // console.log(user.applied)
    const appliedUser = user.applied.includes(post._id)
    const appliedPost = post.applicants.includes(user._id)
    
    // return res.status(200).json({message:user})
    // console.log(user._id)
    try {
        if(appliedUser){
            user.applied.pull(post._id);
            post.applicants.pull(user._id)
            await user.save();
            await post.save()
            return res.status(200).json({message:"Application canceled"})
        } else {
            user.applied.push(post._id);
            post.applicants.push(user._id)
            await user.save();
            await post.save()
            return res.status(200).json({message:"Applied!"})
        }
    } catch (error) {
        // throw new Error(error)
        return res.status(400).json({message:error})
    }
}

export {
    findAll,
    createPost,
    findPost,
    deletePost,
    update,
    applyToJob
}