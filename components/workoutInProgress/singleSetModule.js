
class SingleSetModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            weight: props.set.weight,
            reps: props.set.reps,
            notes: props.set.notes
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render() {
        return (
            <div>
                <p>Set {this.props.index+1}</p>
                Weight: {this.state.weight} <input onChange={this.handleChange} name='weight' type='number' defaultValue={this.props.set.weight} /><br/>
                Reps: {this.state.reps} <input onChange={this.handleChange} name='weight' type='number' defaultValue={this.props.set.weight} /><br/>
                Notes: {this.state.notes} <input onChange={this.handleChange} name='weight' type='text' defaultValue={this.props.set.notes} /><br/>
            </div>
        )
    }
}

export default SingleSetModule;