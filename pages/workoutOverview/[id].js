import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

class WorkoutOverview extends React.Component {
    
    static async getInitialProps({req, query}) {
        const protocol = req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] : 'http';
        const host = req ? req.headers['x-forwarded-host'] : location.host;

        const pageRequest = `${protocol}://${host}/api/GetWorkoutTemplate?id=${query.id}`;

        const res = await fetch(pageRequest, {
            method: 'get'
        });
        const data = await res.json();
        return { data };
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {session_type, split_type, total_time, rest_time, id} = this.props.data.workout;
        const {exercises} = this.props.data;

        return(
            <div>
                <h1>{session_type + " " + split_type}</h1>
                <h3>Total Time: {total_time}</h3>
                <h3>General Rest Time: {rest_time}</h3>
                <p>Workout items go here</p>
                {exercises.map(function(exercise, index){
                    return(
                        <div key={index}>
                            <h3>{exercise.name}</h3>
                             <p>Muscle Group: {exercise.muscle_group}</p>
                            <p>{exercise.sets} x {exercise.rep_range}</p>
                        </div>
                    );
                })}
                <Link href={"/workoutInProgress/" + id}>
                    <button>Start Workout</button>
                </Link>
            </div>
        );
    }
}

export default WorkoutOverview;