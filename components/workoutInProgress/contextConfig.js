
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
        var mappedState = {}
        this.props.exercises.forEach((exercise) => {
            mappedState[exercise.id] = {id: exercise.id, name: exercise.name, muscle_group: exercise.muscle_group, sets: exercise.sets}
        });

        this.state = mappedState;
        this.updateSetArrib = this.updateSetArrib.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    updateSetArrib(exId, setId, attrib, attribVal) { 
        this.setState(function(prevState) {
            var newSetAttrib = {...prevState[exId]}
            newSetAttrib.sets[setId][attrib] = attribVal;
            return {...prevState, [exId]: newSetAttrib};
        })      
    }

    render() {
        return (
            <ExerciseContext.Provider value={{exercises: this.state, updateSetArrib: this.updateSetArrib, handleSubmit: this.handleSubmit}}>
                {this.props.children}
            </ExerciseContext.Provider>
        )
    }
    
}

export default ExerciseProvider;