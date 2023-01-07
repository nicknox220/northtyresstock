if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express");
const app = express();
const bcrypt = require('bcrypt')
const initializePassport = require('./passport-config');
const flash = require('express-flash')
const session = require('express-session')

const { Passport } = require("passport/lib");
initializePassport(
    Passport,
    email => users.find(user => user.email === email)
    )


const users=[]

app.set("view-engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(Passport.initialized())
app.use(Passport.session())

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//login
app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.post("/login", (req, res) => {});

//register
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.post("/register", (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
     } catch{
        res.redirect('/register')
    }
    console.log(users)
});

app.listen(3000);
