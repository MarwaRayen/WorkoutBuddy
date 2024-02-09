import { createContext } from 'react';


export const WorkoutContext = createContext();

export const WorkoutContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reducer, {
        workouts: null,
    })
    return (
        <WorkoutContext.Provider >
            {children}
        </WorkoutContext.Provider>
    );
}