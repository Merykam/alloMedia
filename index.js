const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routes/users');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE)
.then(()=>console.log("database connected"))
.catch(()=>console.log('not connected'))


app.listen(port,()=>{
    console.log(`app is listning to ${port}`);
})

app.use('/users',userRoute)