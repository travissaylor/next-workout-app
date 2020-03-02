import SetModule from './setsModule';

class SingleExerciseModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.exercise.name,
            muscle_group: props.exercise.muscle_group,
        }
        console.log('Single Ex props',this.props)
    }

    render() {
        const {name, muscle_group} = this.state;
        return(
            <div>
                <h5>{name}</h5>
                <p>{muscle_group}</p>
                    <SetModule exId={this.props.exercise.id} sets={this.props.exercise.sets} />
            </div>
        );
    }
}

export default SingleExerciseModule;