import SetModule from './setsModule';

class SingleExerciseModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.exercise.name,
            muscle_group: props.exercise.muscle_group,
        }
    }

    render() {
        const {name, muscle_group} = this.state;
        return(
            <div>
                <h5>{name}</h5>
                <p>{muscle_group}</p>
                <form>
                    <SetModule sets={this.props.exercise.sets} />
                </form>
            </div>
        );
    }
}

export default SingleExerciseModule;