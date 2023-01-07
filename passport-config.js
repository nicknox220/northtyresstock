const { authenticate } = require('passport/lib')

const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport){
const authenticateUser = (email,password,done)=>{
    const user = getUserByEmail(email)
    if (user == null){
        return done(null, false, { message: 'no user found'})
    }

    try {
        if (await bcrypt.compare(password,user.password)){
            return done(null, user)
        } else{
        return done(null, false, {message:'Password Incorrect'})
    }
    }
    catch (e) {
        return done(e)
    }
}

passport.use(new localStrategy({usernameField:'email'}), authenticateUser)
passport.serializeUser((user,done)=>{ })
passport.deserializeUser((id, done)=>{ })
}

module.exports = initialize