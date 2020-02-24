import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

class WorkoutPreviewModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: 'loading workout',
            time: 'loading time',
            session_type: 'loading type',
            split_type: 'split',
            loading: true
        }
    }

    async componentDidMount() {
        const pageRequest = `http://localhost:3000/api/getworkouttemplate?id=${this.props.user}`;

        const res = await fetch(pageRequest);
        const json = await res.json();

        this.setState({
            id: json.workout.id,
            time: json.workout.total_time,
            session_type: json.workout.session_type,
            split_type: json.workout.split_type,
            loading: false
        })
        
    }

    render() {
        return (
                <div>
                    <h3>Next Workout</h3>
                    <h4>{this.state.session_type} {this.state.split_type}</h4>
                    <h6>{this.state.time}</h6>
                    <h6>{this.state.session_type}</h6>
                    <Link href={'/workoutOverview/' + this.state.id}>
                        <button>Overview</button>
                    </Link>
                </div>
        );
    }
}

export default WorkoutPreviewModule;