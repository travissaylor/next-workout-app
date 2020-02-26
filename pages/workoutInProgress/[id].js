import fetch from 'isomorphic-unfetch';

import RoutineModule from '../../components/workoutInProgress/routineModule';

class WorkoutInProgress extends React.Component {
    
    static async getInitialProps({req, query}) {
        const protocol = req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] : 'http';
        const host = req ? req.headers['x-forwarded-host'] : location.host;

        const pageRequest = `${protocol}://${host}/api/GetWorkoutInProgress?id=${query.id}`;

        const res = await fetch(pageRequest, {
            method: 'get'
        });
        const data = await res.json();
        return { data };
    }

    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return(
            <div>
                <h1>{this.props.data.workout.split_type} {this.props.data.workout.session_type} Workout</h1>
                <RoutineModule exercises={this.props.data.exercises}/>
            </div>
        );
    }
}

export default WorkoutInProgress;