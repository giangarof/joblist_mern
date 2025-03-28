import dotenv from 'dotenv'
dotenv.config()
import MongoStore from 'connect-mongo'


// mongo Session
const mongoUri = process.env.DB_URI;
const secret = process.env.SECRET;
const store = MongoStore.create({
    mongoUrl: mongoUri,
    secret,
    touchAfter: 24 * 60 * 60
})

store.on('error', function(e) {
    console.log('error found', e)
})

const sessionConfig = {
    store,
    name:'session',
    secret,
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        
    }
}

export default sessionConfig;