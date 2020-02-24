import SingleExerciseModule from './singleExerciseModule';

class InProgressExerciseModule extends React.Component {

    constructor(props) {
        super(props);
        console.log('exercises props',props)
        this.state = {
            exercises: this.props.exercises
        }
        this.mapSets = this.mapSets.bind(this);
    }

    handleChange(e) {
        this.sete.target.name
    }

    mapSets(sets) {
        if(!sets){
            return ;
        }
        const setsData = JSON.parse(sets);
        console.log("set", setsData);
        return setsData.sets.map(function(set,index) {
            return (
                <div key={index}>
                    <p><strong>Set {index+1}</strong></p>
                    <form>
                        Weight: <input name='weight' type='number' defaultValue={set.weight} /><br/>
                        Reps: <input name='reps' type='number' defaultValue={set.reps} /><br/>
                        Notes: <input name='notes' type='text' defaultValue={set.notes} /><br/>
                        <input name='submit' type='submit' value='submit'/>
                    </form>
                </div> 
            )
        })
    }

    render() {
        console.log(this.state);
        return(
            <div>
                <h3>Exercises</h3>
                <div>
                    {this.props.exercises.map(function(exercise, index) {
                        return(
                            <SingleExerciseModule index={index} exercise={exercise}/>
                        );
                    }.bind(this))}
                </div>
            </div>
        )
    }
}

export default InProgressExerciseModule;