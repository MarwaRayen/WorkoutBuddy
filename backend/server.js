require('dotenv').config()
const express = require('express');
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose');



// app
const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
})




// routes 
app.use('/api/workouts',workoutRoutes)


// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {  
        console.log('server started');
      });
    console.log('connected to db')
})
.catch(err => {
    console.log(err)
})


