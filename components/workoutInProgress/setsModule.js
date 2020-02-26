import SingleSetModule from './singleSetModule';

class SetsModule extends React.Component {

    constructor(props) {
        super(props);
    }

    mapSets() {
        const sets = JSON.parse(this.props.sets);

        if(sets === parseInt(sets)){
            var newSets = {
                sets: []
            }
            for(var i=0; i < sets-1; i++){
                newSets.sets.push({weight: null, reps: null, notes: ''})
            }
            return(
                <div>
                    {newSets.sets.map(function(set, index) {
                        return(
                            <SingleSetModule set={set} index={index} key={index}/>
                        )
                    })}
                </div>
            )
        }

        return(
            <div>
                {sets.sets.map(function(set, index) {
                    return(
                        <SingleSetModule set={set} index={index} key={index}/>
                    )
                })}
            </div>
        )
    }

    render() {
        return(
            <div>{this.mapSets()}</div>
        )
    }
}

export default SetsModule;