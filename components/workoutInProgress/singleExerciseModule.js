class SingleExerciseModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.exercise.name,
            muscle_group: props.exercise.muscle_group,
            sets: JSON.parse(props.exercise.sets)
        }
        
        this.mapSets = this.mapSets.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        var newSets = this.state.sets;
        newSets.sets[e.target.getAttribute("data-index")][e.target.name] = parseInt(e.target.value);
        this.setState({
            sets: newSets
        })
    }

    mapSets(sets) {
        if(this.props.exercise.sets === parseInt(this.props.exercise.sets)){
            // var newSetsState = {sets: {sets: []}};
            // for(var i=0; i < this.props.exercise.sets-1; i++){
            //     newSetsState.sets.sets.push({weight: null, reps: null, notes: ''});
            // }
            // this.setState({
            //     sets: newSetsState
            // })
            return;
        }

        console.log('State w/o new sets', this.state.sets.sets);

        const setsData = sets;

        return setsData.sets.map(function(set,index) {
            return (
                <div key={index}>
                    <p><strong>Set {index+1}</strong></p>
                    <form>
                        Weight {this.state.sets.sets[index].weight}: <input onChange={this.handleChange} data-index={index} name='weight' type='number' defaultValue={set.weight} /><br/>
                        Reps {this.state.sets.sets[index].reps}: <input onChange={this.handleChange} data-index={index} name='reps' type='number' defaultValue={set.reps} /><br/>
                        Notes {this.state.sets.sets[index].notes}: <input onChange={this.handleChange} data-index={index} name='notes' type='text' defaultValue={set.notes} /><br/>
                        <input name='submit' type='submit' value='submit'/>
                    </form>
                </div> 
            )
        }.bind(this))
    }

    render() {
        const {name, muscle_group, sets} = this.state;
        return(
            <div key={this.props.index}>
                <h5>{name}</h5>
                <p>{muscle_group}</p>
                <div>{this.mapSets(sets)}</div>
            </div>
        );
    }
}

export default SingleExerciseModule;