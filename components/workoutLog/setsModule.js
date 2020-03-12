import SingleSetModule from './singleSetModule';

class SetsModule extends React.Component {

    render() {
        return(
            <div>
                {this.props.sets.map(function(set, index) {
                    return(
                        <SingleSetModule {...this.props} set={set} index={index} key={index}/>
                    )
                }.bind(this))}
            </div>
        )
    }
}

export default SetsModule;