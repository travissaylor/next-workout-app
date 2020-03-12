import {TextField} from '@material-ui/core';

import {withExerciseContext} from "./contextConfig";

class SingleSetModule extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteSet = this.handleDeleteSet.bind(this);
    }

    handleDeleteSet(e) {
        e.preventDefault();

        this.props.value.deleteSet(this.props.exIndex, this.props.index);
    }

    handleChange(e) {
        console.log('Handle change', this.props.exIndex)
        const value = e.target.value;
        if(value === parseInt(value)) {
            value = parseInt(value);
        }
        this.props.value.updateSetArrib(this.props.exIndex, this.props.index, e.target.name, value);
    }

    render() {
        return (
            <div>
                <p>Set {this.props.index+1}</p>
                <TextField
                    id="weight"
                    label="Weight"
                    name="weight"
                    type="number"
                    
                    defaultValue={this.props.set.weight}
                    onChange={this.handleChange}
                    variant="outlined"
                />
                <TextField
                    id="reps"
                    label="Reps"
                    name="reps"
                    type="number"
                    
                    defaultValue={this.props.set.reps}
                    onChange={this.handleChange}
                    variant="outlined"
                />
                <TextField
                    id="notes"
                    label="Notes"
                    name="notes"
                    type="text"
                    defaultValue={this.props.set.notes}
                    onChange={this.handleChange}
                    variant="outlined"
                />
                <p>Weight: {this.props.set.weight} <input onChange={this.handleChange} name='weight' type='number' defaultValue={this.props.set.weight} /></p>
                <p>Reps: {this.props.set.reps} <input onChange={this.handleChange} name='reps' type='number' defaultValue={this.props.set.reps} /></p>
                <p>Notes: {this.props.set.notes} <input onChange={this.handleChange} name='notes' type='text' defaultValue={this.props.set.notes} /></p>
                <button onClick={this.handleDeleteSet}>Delete Set</button>
            </div>
        )
    }
}

export default withExerciseContext(SingleSetModule);