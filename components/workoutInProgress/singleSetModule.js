import {withExerciseContext} from "./contextConfig";

class SingleSetModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weight: props.set.weight,
            reps: props.set.reps,
            notes: props.set.notes
        }
        this.handleChange = this.handleChange.bind(this);
        console.log('value', this.props.value);
    }

    handleChange(e) {
        const value = e.target.value;
        if(value === parseInt(value)) {
            value = parseInt(value);
        }
        this.props.value.updateSetArrib(this.props.exId, this.props.index, e.target.name, value);
    }

    render() {
        return (
            <div>
                <p>Set {this.props.index+1}</p>
                <p>Weight: {this.props.set.weight} <input onChange={this.handleChange} name='weight' type='number' defaultValue={this.props.set.weight} /></p>
                <p>Reps: {this.props.set.reps} <input onChange={this.handleChange} name='reps' type='number' defaultValue={this.props.set.reps} /></p>
                <p>Notes: {this.props.set.notes} <input onChange={this.handleChange} name='notes' type='text' defaultValue={this.props.set.notes} /></p>
            </div>
        )
    }
}

export default withExerciseContext(SingleSetModule);