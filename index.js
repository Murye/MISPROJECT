// requiring the framework "EXPRESS"
const express = require("express");
// body-parser makes the data in the form to be viewed, its a middle ware 
const bodyParser = require('body-parser');
const User=require('./models/user')
const mongoose=require('mongoose')
// Initialising the app
const app=express(); 
app.use(express.urlencoded({extended:false}))
// specifiying the templating engine 
app.set('view engine', 'pug')
app.set('views','./views')
// Connecting to the DB
mongoose.connect('mongodb://localhost:27017/students', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// Creating route
app.get('/Home',(req,res)=>{
    // res.send('Wellcome to the Homepage')
    res.render('home')
});
app.get('/page2',async(req,res)=>{
    //res.render('page2')
    try {
        // "User" = Model 
        let result=await User.find( )
        res.render('page2',{users:result })
    } catch (error) {
      console.log(error)  
    }

});
app.post('/delete',async (req,res)=>{
    try {
        await User.deleteOne({
            _id:req.body.id
        })
        res.redirect('/page2')
    } catch (error) {
        console.log(error)
    }
})
app.post('/edit/:id',async (req,res)=>{
    try {
        const requestedId=req.params.id;
        await User.findOneAndUpdate({
            _id:requestedId,    
        },req.body)
        res.redirect('/page2')
    } catch (error) {
        console.log(error)
    }
})
app.get('/edit/:id',async (req,res)=>{
    try {
        const query=req.params.id
        const user=await User.findById(query)
        if (user){
            res.redirect('/edit',
            {
                user:user
            })
        }
    } catch (error) {
        console.log(error)
    }
})
app.get('/About',(req,res)=>{
    res.send('Know more about us')
})

app.post('/register', async(req,res)=> {
    const user=new User(req.body);
    try{
        await user.save();
        res.redirect('/home');
    } catch (error) { 
        console.log(error)   
    } 
    // console.log(req.body)
    // res.json(req.body)
})

// Creating a server
app.listen(3000, ()=> {console.log("App is Running")})
