import fetch from 'isomorphic-unfetch';

import RoutineModule from '../../components/workoutInProgress/routineModule';
import ExerciseProvider,{withExerciseContext} from '../../components/workoutInProgress/contextConfig';


const FormSubmitWrapper = withExerciseContext(class FormWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(e) {
        e.preventDefault();
        e.persist();

        console.log('submit exercises', this.props.value.exercises);

        var exercises = JSON.stringify(this.props.value.exercises);
        var workout = JSON.stringify(this.props.data.workout);
        exercises = encodeURIComponent(exercises);
        workout = encodeURIComponent(workout);

        const postRequest = `http://localhost:3000/api/postworkout?exercises=${exercises}&workout=${workout}`;
        const res = await fetch(postRequest, {
            method: 'post'
        });

        if(!res.ok){
            console.log('problem sending workout', await res.json());
            return;
        }

        console.log("Workout Sent", res);
    }

    render() {
        return (
            <div>
                <h1>{this.props.data.workout.split_type} {this.props.data.workout.session_type} Workout</h1>
                <form onSubmit={this.submitHandler}>
                    <RoutineModule exercises={this.props.data.exercises}/>
                    <input type="submit" name="submit" onClick={this.submitHandler}/>
                </form>
            </div>
        )
    }
})

class WorkoutInProgress extends React.Component {
    
    static async getInitialProps({req, res, query}) {
        const protocol = req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] : 'http';
        const host = req ? req.headers['x-forwarded-host'] : location.host;

        const pageRequest = `${protocol}://${host}/api/GetWorkoutInProgress?id=${query.id}`;

        const apiRes = await fetch(pageRequest, {
            method: 'get'
        });

        if(!apiRes.ok) {
            if(apiRes.status === 401) {
                res.writeHead(302, {Location: '/'});
                res.end();
                return;
            }
        }
        const data = await apiRes.json();
        return { data };
    }

    constructor(props) {
        super(props);
        console.log('INITIAL',this.props.data);
    }

    render() {
        return(
            <div>
                <ExerciseProvider exercises={this.props.data.exercises}>
                    <FormSubmitWrapper {...this.props}/>
                </ExerciseProvider>
            </div>
        );
    }
}

export default WorkoutInProgress;