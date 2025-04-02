import User from "../model/user.js";
import { generateToken } from "../../config/token.js";

const login = async (req,res) => {
    const {email, password} = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({email})

        if(!email || !password){
            return res.status(400).json({message: `Please, enter your credentials.`})
        }

        if(!user){
            return res.status(404).json({message: `This account is not registered.`})
        }
        
        if(user && (await user.matchPassword(password))){
            req.session.name = user.name;
            // console.log(req.session.name)
            generateToken(res, user._id)
            return res.status(200).json({message:`Welcome, ${user.name}`, profile: user})
        } else{
            return res.status(404).json({message: `User not found.`})
        }
        

        
    } catch (error) {
        throw new Error(error)
    }
}

const signup = async (req,res) => {
    const {name, username, email, password, passwordConfirmation} = req.body;
    console.log(req.body)
    try {
        const verifyIfEmailExits = await User.findOne({email})
        const verifyIfUsernameExits = await User.findOne({username})
        
        if(verifyIfEmailExits){
            return res.status(400).json({message: 'Email already in use. Please, use another email.'})
        } 

        if(verifyIfUsernameExits){
            return res.status(400).json({message: 'Username already in use. Please, use another username.'})
        } 

        if(password != passwordConfirmation){
            return res.status(400).json({message: "Passwords do not match..."})
        }

        if(!name || !username || !email || !password || !passwordConfirmation){
            return res.status(400).json({message: "Please fill up all fields."})
        }

        const newUser = await User.create({
            name, username, email, password
        })
        return res.status(201).json({message: "User created successfully", created: newUser ? newUser : "Something went wrong, Try again."})
        
    } catch (error) {
        throw new Error(error)
    }

}

const logout = async (req,res) => {
    res.cookie('jwt', '', {
        httpOnly:true,
        expires: new Date(0)
    })

    if(!req.session.name){
        return res.status(400).json({message:"cannot log out because you are not log in"})
    }else {
        return res.status(200).json({message: `Logged out, ${req.session.name}`})
    }
}

const update = async (req, res) => {
    const {id} = req.params;
    const {
        name, username, password, passwordConfirmation, email, title, company, aboutMe
    } = req.body;
    const user = await User.findById(id)
    const verifyIfEmailExits = await User.findOne({email})
   
    try {
         // If user doesnt exist
         if(!user){
             res.status(404).send(`user dont exist.`)
         }
     
         // check for password
         if (password !== passwordConfirmation){
             res.status(400).send(`Passwords dont match`)
         }
     
         // verify email
         if (verifyIfEmailExits && verifyIfEmailExits._id.toString() !== id){
             res.status(400).send(`'Email already in use. Please, use another email.'`)
     
         // if user does exist
         } else if (user){
             user.name = name;
             user.username = username;
             user.password = password;
             user.email = email;
             user.title = title,
             user.aboutMe = aboutMe,
             user.company = company
             await user.save()
             res.status(200).json({message:`User updated successfully!`, user})
         } else{
             res.status(404).send(`something went wrong, try again later.`)
         }
        
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

const getAll = async(req,res) => {
    const users = await User.find({}).populate('posts')
    // console.log(users)
    res.status(200).json(users)
}

// Get user by ID
const getUser = async(req,res) => {
    const lookingFor = req.params.id;
    const user = await User.findById(lookingFor).populate('posts');
    res.status(200).json({
        message : user ? "User found" : "user could not be found", 
        user: user ? user : "No details"})
}

const deleteUser = async(req,res) => {
    const {id} = req.params;
    const user = await User.findByIdAndDelete(id);

    try {
        if(!user){
            res.status(400).json({message:'user already deleted, or user doesnt exist.'})
        } else {
            res.status(200).json({message:'User deleted successfully'});
            // console.log(user)
        }
        
    } catch (error) {
        throw new Error(error)
    }
}

export {
    login, 
    signup,
    logout,
    update,
    getAll,
    getUser,
    deleteUser,
}