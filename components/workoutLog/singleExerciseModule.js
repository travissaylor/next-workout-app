import SetModule from './setsModule';
import {withExerciseContext} from './contextConfig';

class SingleExerciseModule extends React.Component {

    constructor(props) {
        super(props);
        console.log('Single Ex props',this.props)
        this.handleAddSet = this.handleAddSet.bind(this);
        this.handleDeleteExercise = this.handleDeleteExercise.bind(this);
    }

    handleAddSet(e) {
        console.log('Add set: ', this.props.index)
        e.preventDefault();
        this.props.value.addSet(this.props.index);
    }

    handleDeleteExercise(e) {
        e.preventDefault();
        console.log("Delete this ex: ", this.props.exercise.log_ex_id);
        this.props.value.deleteExercise(this.props.exercise.log_ex_id);
    }

    render() {
        return(
            <div>
                <h5>{this.props.exercise.name}</h5>
                <p>{this.props.exercise.muscle_group}</p>
                    <SetModule exIndex={this.props.index} sets={this.props.exercise.sets} />
                    <button onClick={this.handleAddSet}>Add a Set</button> <button onClick={this.handleDeleteExercise}>Delete Exercise</button>

            </div>
        );
    }
}

export default withExerciseContext(SingleExerciseModule);