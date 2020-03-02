import SingleExerciseModule from './singleExerciseModule';

class RoutineModule extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h3>Exercises</h3>
                <div>
                    {this.props.exercises.map(function(exercise, index) {
                        return(
                            <SingleExerciseModule key={index} exercise={exercise}/>
                        );
                    })}
                </div>
            </div>
        )
    }
}

export default RoutineModule;