const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
//creating body-parser for post request
const bodyparse = require("body-parser");
//creating mongoose to store contact details
const mongoose = require('mongoose');
main().catch(err => console.log(err));
//estabilish connection with dataBase
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

//building schema for contact 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
//making model or collection of the above schema
const Contact = mongoose.model('Contact', contactSchema);
//Express setup
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG setup
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Endoint
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params = {};
    res.status(200).render('contact.pug',params);
});

app.post('/contact',(req,res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved succesfully");
    }).catch(()=>{
        res.status(400).send("Item could not be saved.");
    })

})
app.listen(port,()=>{
    console.log(`The application started uccesfully on : ${port}`);
})