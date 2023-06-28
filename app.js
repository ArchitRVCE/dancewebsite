const express = require("express");
const path = require("path");
const app = express();
const port = 8000;

//Express setup
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG setup
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

//Endoint
app.get('/',(req,res)=>{
    const params = {};
    res.status(200).render('index.pug',params);
});
app.listen(port,()=>{
    console.log(`The application started uccesfully on : ${port}`);
})