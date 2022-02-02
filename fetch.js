const express= require('express')
const MongoClient= require('mongodb').MongoClient
const mongoose = require('mongoose');

const app=express()

app.use(express.json())
var database

app.get('/', (req,resp) => {
    resp.send('welcome')
})
//FETCH DATA FROM MONGODB
app.get('/api/user/details', (req, resp) => {
    database.collection('u_register').find({}).toArray((err, result) => {
        if (err) throw err
        resp.send(result)
    })
})
//DELETE DATA
app.delete('/delete/:id', (req, resp) => {
    database.collection('u_register').deleteOne({_id: mongoose.Types.ObjectId(req.params.id)},(err, result) => {
        if (err) throw console.log(id)
        resp.send("User Deleted")
    })
})
//UPDATE DATA
app.post('/update/:id', (req, resp) => {
    var user= {
        Name: req.body.Name,
    }
    database.collection('u_register').updateOne({_id: mongoose.Types.ObjectId(req.params.id)}, {$set: user},
    (err, result) => {
        if (err) throw console.log(id)
        resp.send("User updated")
    })
})

app.listen(8012, () => {
    MongoClient.connect('mongodb+srv://Muneeza:skindisease@skindisease.aqmhn.mongodb.net/test?authSource=admin&replicaSet=atlas-hvyb79-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useNewUrlParser: true }, (error, result) => {
        if(error) throw error
        database= result.db('user')
        console.log("sucess")
    })

})
