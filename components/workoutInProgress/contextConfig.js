
export const ExerciseContext = React.createContext();

export const withExerciseContext = (Component) => {
    return (props) =>(
        <React.Fragment>
            <ExerciseContext.Consumer>
            {(value) => (
                <Component {...props} value={value}/>
            )}
            </ExerciseContext.Consumer>
        </React.Fragment>
    )
}

class ExerciseProvider extends React.Component {

    constructor(props) {
        super(props);
        var mappedState = {
            exercises: []
        }
        this.props.exercises.forEach((exercise) => {
            mappedState.exercises.push({id: exercise.id, name: exercise.name, muscle_group: exercise.muscle_group, sets: exercise.sets});
        });
        console.log("mapped exercises", mappedState.exercises);

        this.state = mappedState;
        this.updateSetArrib = this.updateSetArrib.bind(this);
        this.addSet = this.addSet.bind(this);
        this.deleteSet = this.deleteSet.bind(this);
        this.addExercise = this.addExercise.bind(this);
    }

    addExercise() {
        this.setState(function(prevState) {
            var newExercise = prevState.exercises;
            newExercise.push({
                id: prevState.exercises.length+1,
                name: 'Overhead Press',
                muscle_group: "shoulders",
                sets:[{weight: null, reps: null, notes: ''}]
            });
            return {...prevState, exercises: newExercise};
        });
    }

    deleteSet(exId, setId) {
        console.log('Ex, Set', {exId, setId});
        this.setState(function(prevState) {
            var removedSet = prevState.exercises[exId-1]
            removedSet.sets.splice(setId, 1);
            return {...prevState.exercises, [exId]: removedSet};
        }.bind(this)); 
    }

    addSet(exId) {
        this.setState(function(prevState) {
            var newSet = prevState.exercises[exId-1]
            newSet.sets.push({weight: null, reps: null, notes: ''});
            return {...prevState.exercises, [exId]: newSet};
        });

        console.log('Add set to ', exId);
    }

    updateSetArrib(exId, setId, attrib, attribVal) { 
        this.setState(function(prevState) {
            var newSetAttrib = prevState.exercises[exId-1]
            newSetAttrib.sets[setId][attrib] = attribVal;
            return {...prevState.exercises, [exId]: newSetAttrib};
        });     
    }

    render() {
        return (
            <ExerciseContext.Provider value={{exercises: this.state.exercises, updateSetArrib: this.updateSetArrib, handleSubmit: this.handleSubmit, addSet: this.addSet, deleteSet: this.deleteSet, addExercise: this.addExercise}}>
                {this.props.children}
            </ExerciseContext.Provider>
        )
    }
    
}

export default ExerciseProvider;