import SetModule from './setsModule';
import {withExerciseContext} from './contextConfig';

class SingleExerciseModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.exercise.name,
            muscle_group: props.exercise.muscle_group,
        }
        console.log('Single Ex props',this.props)
        this.handleAddSet = this.handleAddSet.bind(this);
    }

    handleAddSet(e) {
        e.preventDefault();
        this.props.value.addSet(this.props.exercise.id);
    }

    render() {
        const {name, muscle_group} = this.state;
        return(
            <div>
                <h5>{name}</h5>
                <p>{muscle_group}</p>
                    <SetModule exId={this.props.exercise.id} sets={this.props.exercise.sets} />
                    <button onClick={this.handleAddSet}>Add a Set</button>
            </div>
        );
    }
}

export default withExerciseContext(SingleExerciseModule);