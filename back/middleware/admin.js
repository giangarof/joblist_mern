import asyncHandler from "./asyncHandler.js"
import ExpressError from "./ExpressError.js"
import jwt from 'jsonwebtoken'
import User from "../MCR/model/user.js"
import Post from "../MCR/model/post.js"

export const administrator = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next()
    } else{
        throw new ExpressError('No authorized as admin', 401)
    }
}

// Protect routes users from middleware
// Check if you are logged in
export const protect = asyncHandler(async(req,res,next) => {
    let token;
    // Read the jwt from the cookie
    token = req.cookies.jwt;
    // console.log(token)
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            // req.user = decoded;
            // console.log(decoded)
            // console.log(req.user)
            res.status(200)
            next()
        } catch (error) {
            console.log(error)
            res.status(401);
            throw new Error('No authorization, token failed')
        }

    } else {
        res.status(401);
        throw new Error('No authorization allowed')
    }
})

// export const postOwner = async(req,res) => {
//     const {id} = req.params
//     const post = await Post.findById(id)
//     console.log(req.user_id, post.author)
// }

export const Admin_Or_Owner_Post = asyncHandler(async(req,res,next) => {
    const {id} = req.params;
    const post = await Post.findById(id)
    const postOwner = post.author[0]._id
    const userId = req.user._id
    const isAdmin = req.user.isAdmin
    // console.log(postOwner)
    // console.log(userId)
    if(postOwner.equals(userId) || isAdmin){
        next()
    } else{
        throw new ExpressError(`You're not the owner of the post, nor Admin`, 401)
    }
    
})

export const Admin_Or_Owner_User = asyncHandler(async(req,res,next) => {
    const {id} = req.params;
        // The user you're looking for
        const user = await User.findById(id)
        const userOwnerId = user._id
    
        // the logged user
        const loggedUser_id = req.user._id;
    
        // If the logged user is admin
        const isAdmin = req.user.isAdmin
        // console.log(userOwnerId, loggedUser_id, isAdmin)
        if(userOwnerId.equals(loggedUser_id) || isAdmin){
            next()
        } else{
            // res.status(401).json({message:'error'})
            throw new ExpressError(`You're not the owner account, nor Admin`, 401)
        }
})




