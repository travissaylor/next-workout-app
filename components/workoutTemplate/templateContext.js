
export const TemplateContext = React.createContext();

export const withTemplateContext = (Component) => {
    return (props) =>(
        <React.Fragment>
            <TemplateContext.Consumer>
            {(value) => (
                <Component {...props} value={value}/>
            )}
            </TemplateContext.Consumer>
        </React.Fragment>
    )
}

class TemplateProvider extends React.Component {

    constructor(props) {
        super(props);
        console.log("props", this.props);

        this.state = {
            workout: this.props.workout,
            exercises: this.props.exercises
        };
        this.updateSetArrib = this.updateSetArrib.bind(this);
        this.addSet = this.addSet.bind(this);
        this.deleteSet = this.deleteSet.bind(this);
        this.addExercise = this.addExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
    }

    deleteExercise(exId) {
        this.setState(function(prevState) {
            const newExercises = prevState.exercises.filter(function(exercise) {
                return (exercise.log_ex_id !== exId);
            });
            return {exercises: newExercises};
        });
    }

    addExercise(exercise) {
        this.setState(function(prevState) {
            const newExercise = prevState.exercises;
            newExercise.push({
                log_ex_id: prevState.exercises[prevState.exercises.length-1].log_ex_id + 1,
                log_id: prevState.workout.log_id,
                user_id: prevState.workout.user_id,
                name: exercise.name,
                muscle_group: exercise.muscle_group,
                sets: exercise.sets
            });
            console.log('newExercise', newExercise);
            return {...prevState, exercises: newExercise};
        });
    }

    deleteSet(exIndex, setIndex) {
        this.setState(function(prevState) {
            return({
            ...prevState,
                exercises: [
                    ...prevState.exercises.map(function(exercise) {
                        if(exercise.log_ex_id === prevState.exercises[exIndex].log_ex_id) {
                            exercise.sets.splice(setIndex, 1);
                        }
                        return exercise;
                    })
                ]  
            })        
        });
    }

    addSet(exIndex) {
        this.setState(function(prevState) {
            return({
            ...prevState,
                exercises: [
                    ...prevState.exercises.map(function(exercise) {
                        if(exercise.log_ex_id === prevState.exercises[exIndex].log_ex_id) {
                            exercise.sets.push({weight: null, reps: null, note: ''})
                        }
                        return exercise;
                    })
                ]  
            })        
        });
    }

    updateSetArrib(exIndex, setId, attrib, attribVal) { 
        this.setState(function(prevState) {
            return({
            ...prevState,
                exercises: [
                    ...prevState.exercises.map(function(exercise) {
                        if(exercise.log_ex_id === prevState.exercises[exIndex].log_ex_id) {
                            exercise.sets[setId][attrib] = attribVal;
                        }
                        return exercise;
                    })
                ]  
            })        
        });     
    }

    render() {
        return (
            <TemplateContext.Provider value={{exercises: this.state.exercises, updateSetArrib: this.updateSetArrib, handleSubmit: this.handleSubmit, addSet: this.addSet, deleteSet: this.deleteSet, addExercise: this.addExercise, deleteExercise: this.deleteExercise}}>
                {this.props.children}
            </TemplateContext.Provider>
        )
    }
    
}

export default TemplateProvider;