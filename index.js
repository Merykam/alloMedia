const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const userRoute = require('./routes/users');
const roleRoute = require('./routes/role');
const cookieParser = require('cookie-parser');
app.use(express.json())
const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE)
.then(()=>console.log("database connected"))
.catch(()=>console.log('not connected'))


app.use('/api/users',userRoute);
app.use('/api/roles',roleRoute);
app.use(cookieParser());


app.listen(port,()=>{
    console.log(`app is listning to ${port}`);
})
