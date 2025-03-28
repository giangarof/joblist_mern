import express from "express"
import path from "path"
import ExpressError from "./middleware/ExpressError.js"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import session from "express-session"
dotenv.config()

const app = express()
connectDB()

// Express session
app.use(session({
    secret: process.env.SECRET, // Change this to a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

import user from "./MCR/routes/user.js"
import post from "./MCR/routes/post.js"
import sessionConfig from "./config/session.js"

// Routes
app.use('/api/user', user)
app.use('/api/post', post)


// Error handling

// Using the custom Error handler for all the possible routes 
app.all('*', (req,res,next) => {
    next(new ExpressError('Page Not Found, try again.', 404))
});

// Here I'm using app.use() to destructure the -err- parameter
app.use((err, req,res, next) => {
    const {status=500, msg = 'something went wrong'} = err;
    res.status(status).send(msg)
    next()
})

// Running the app
const port = 8000;
app.listen(port, () => console.log(`running, port ${port}`))