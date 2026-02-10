
require('dotenv').config();
const express= require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Contact = require('./models/model');
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to database atlas');
}).catch((err)=>{
    console.log(err);
});
const app= express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.listen(3000, ()=> console.log('Server started on port 3000'));
app.get('/',async (req, res)=> {
    const contacts= await Contact.find({});
    res.render('index', { contacts });
});
app.post('/save',async (req, res)=> {
    const {name,phone}=req.body;
    const cont=new Contact({name,phone});
    await cont.save();
    res.redirect('/');
});
app.post('/delete/:id',async (req, res)=> {
    const contactid=req.params.id;
    await Contact.findByIdAndDelete(contactid);
    res.redirect('/');
});


    