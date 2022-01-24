const express= require('express')
const MongoClient= require('mongodb').MongoClient

const app=express()

app.use(express.json())
var database

app.get('/', (req,resp) => {
    resp.send('welcome')
})
//FETCH DATA FROM MONGODB
app.get('/api/user', (req, resp) => {
    database.collection('u_register').find({}).toArray((err, result) => {
        if (err) throw err
        resp.send(result)
    })
})
app.listen(8012, () => {
    MongoClient.connect('mongodb+srv://Muneeza:skindisease@skindisease.aqmhn.mongodb.net/test?authSource=admin&replicaSet=atlas-hvyb79-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true', { useNewUrlParser: true }, (error, result) => {
        if(error) throw error
        database= result.db('user')
    })

})