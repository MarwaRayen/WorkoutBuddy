const Workout = require('../models/workout');
const mongoose = require('mongoose')



// get all workouts
const getWorkouts = async (req, res) => {
    try{
        const workouts = await Workout.find().sort({createdAt: -1})
        res.status(200).json(workouts)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}


// get a workout
const getWorkout = async (req, res) => {

    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'invalid id'})
    }

    try {
        const workout = await Workout.findById(id)
        if (!workout) {
            return res.status(400).json({error: 'workout not found'})
        }
        
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
    
    
}



// create a workout
const createWorkout = async (req, res) => {
    const {name, reps, load} = req.body;

    // add workout to db
    try {
        const workout = await Workout.create({name, reps, load})
        res.json(workout)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// delete a workout
const deleteWorkout = async (req, res) => {

    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'invalid id'})
    }

    try {

        const workout = await Workout.findByIdAndDelete({_id: id})
        if (!workout) {
            return res.status(404).json({error: 'workout not found'})
        }
        res.status(200).json({message: 'workout deleted'})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}


// update a workout
const updateWorkout = async (req, res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'invalid id'})
    }

    try {

        const workout = await Workout.findByIdAndUpdate({_id: id}, {...req.body})
        if (!workout) {
            return res.status(404).json({error: 'workout not found'})
        }
        res.status(200).json({message: 'workout updated'})

    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}





module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout, 
    deleteWorkout, 
    updateWorkout
}