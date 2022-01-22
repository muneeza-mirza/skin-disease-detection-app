const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const {registervalidation , loginvalidation} = require('../validation');

//register api
router.post('/register',async (req,res) => {

 // VALIDATE BEFORE SAVING A USER 
 const {error}  =registervalidation(req.body);
 if(error) return res.status(400).send(error.details[0].message);

  //depreciated
//   const validation = Joi.validate(req.body,schema);
//   res.send(validation);

//checking if the user is already in the database
const emailExist = await User.findOne({email:req.body.email});
if(emailExist) return res.status(400).send('Email already exists');

// Hash Passwords
//generating a salt
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password,salt);

//Create a new user
    const user = new User({
       name:req.body.name,
       email:req.body.email,
       password:hashedPassword
   });
   try{
       const savedUser = await user.save();
       res.send({user: user._id});
   }catch(err){
       res.status(400).send(err);
   }
    // res.send('Register');
});


//Login

router.post('/login',async (req,res) => {
    
 // VALIDATE BEFORE SAVING A USER 
 const {error}  =loginvalidation(req.body);
 if(error) return res.status(400).send(error.details[0].message);

 
//checking if the user is already in the database
const user = await User.findOne({email:req.body.email});
if(!user) return res.status(400).send('Email is not found');
//PASSWORD IS CORRECT
const validPass = await bcrypt.compare(req.body.password,user.password);
if(!validPass) return res.status(400).send('Invalid Password')

//Create and assign a token
const token = jwt.sign({ _id: user._id },process.env.TOKEN_SECRET);
res.header('auth-token',token).send(token);



//res.send('Logged In!');



})

// router.post('/login')

//localhost:5000

//api/user/login

module.exports = router;