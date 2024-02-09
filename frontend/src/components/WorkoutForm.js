import { useEffect, useState } from "react";


const WorkoutForm = () => {

    const [name, setName] = useState('')
    const [reps, setReps] = useState('')
    const [load, setLoad] = useState('')
    const [err, setErr] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()


        const workout = {name, reps, load}
        const response = await fetch('/api/workouts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout),
        })

        const data = await response.json()

        if (!response.ok) {
            setErr(data.error)
        }else {
            setName('')
            setReps('')
            setLoad('')
            setErr(null)
            console.log('data added')
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>
            <label>Workout name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label>Number of reps:</label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
            <label>Load (kg):</label>
            <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} />
            <button>Add workout</button>
            {err && <p>{err}</p>}
        </form>
    )
}

export default WorkoutForm