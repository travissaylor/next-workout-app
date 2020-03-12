import {withExerciseContext} from './contextConfig';

class AddExercise extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showing: false,
            name: '',
            muscle_group: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddExercise = this.handleAddExercise.bind(this);
        this.cancelAddExercise = this.cancelAddExercise.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleAddExercise(e) {
        e.preventDefault();
        if(!this.state.showing) {
            this.setState({showing: true});
            return;
        }
        this.props.value.addExercise({
            name: this.state.name,
            muscle_group: this.state.muscle_group
        });
        this.setState({showing: false});
    }

    cancelAddExercise(e) {
        e.preventDefault();
        this.setState({showing: false});
        return;
    }

    render() {
        if(!this.state.showing){
            return (
                <button onClick={this.handleAddExercise}>Add an Exercise</button>
            );
        }

        return(
            <div>
                <p>Name: {this.state.name} <input onChange={this.handleChange} name='name' type='text' /></p>
                <p>Muscle Group: {this.state.muscle_group} <input onChange={this.handleChange} name='muscle_group' type='text' /></p>
                <button onClick={this.handleAddExercise}>Add Exercise</button> <button onClick={this.cancelAddExercise}>Cancel</button>
            </div>
        )
    }
}

export default withExerciseContext(AddExercise);