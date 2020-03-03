import SingleExerciseModule from './singleExerciseModule';
import {withExerciseContext} from './contextConfig';

class RoutineModule extends React.Component {

    constructor(props) {
        super(props);
        console.log('routine props',this.props);
        this.handleAddExercise = this.handleAddExercise.bind(this);
    }

    handleAddExercise(e) {
        e.preventDefault();
        this.props.value.addExercise();
    }

    render() {
        return(
            <div>
                <h3>Exercises</h3>
                <div>
                    {this.props.value.exercises.map(function(exercise, index) {
                        return(
                            <div>
                                <SingleExerciseModule key={index} exercise={exercise}/>
                            </div>
                        );
                    })}
                </div>
                <button onClick={this.handleAddExercise}>Add an Exercise</button>
            </div>
        )
    }
}

export default withExerciseContext(RoutineModule);