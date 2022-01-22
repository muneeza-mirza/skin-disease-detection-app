const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute = require('./Routes/auth');
const postRoute = require('./Routes/posts')

dotenv.config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT
,{ useNewUrlParser:true }
,() => console.log('connected to db!')
);


//Middlewares
app.use(express.json());



//Route Middlewares
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(process.env.PORT || 8080 , () => console.log('Server Up & Running'));