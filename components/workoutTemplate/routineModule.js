import SingleExerciseModule from './singleExerciseModule';
import {withTemplateContext} from './templateContext';
import AddExercises from './addExercise';

class RoutineModule extends React.Component {

    constructor(props) {
        super(props);
        console.log('routine props',this.props);
    }

    render() {
        return(
            <div>
                <h3>Exercises</h3>
                <div>
                    {this.props.value.exercises.map(function(exercise, index) {
                        return(
                            <div key={index}>
                                <SingleExerciseModule index={index} exercise={exercise}/>
                            </div>
                        );
                    })}
                </div>
                <AddExercises />
            </div>
        )
    }
}

export default withTemplateContext(RoutineModule);