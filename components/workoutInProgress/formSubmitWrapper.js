import fetch from 'isomorphic-unfetch';

import {withExerciseContext} from '../../components/workoutInProgress/contextConfig';
import RoutineModule from '../../components/workoutInProgress/routineModule';

const FormSubmitWrapper = class FormWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
    }

    async submitHandler(e) {
        e.preventDefault();
        e.persist();

        console.log('submit exercises', this.props.value.exercises);

        var exercises = JSON.stringify(this.props.value.exercises);
        var workout = JSON.stringify(this.props.workout);
        exercises = encodeURIComponent(exercises);
        workout = encodeURIComponent(workout);

        const postRequest = `http://localhost:3000/api/post/workoutlog?exercises=${exercises}&workout=${workout}`;
        console.log(postRequest);
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
                <h1>{this.props.workout.split_type} {this.props.workout.session_type} Workout</h1>
                <form onSubmit={this.submitHandler}>
                    <RoutineModule exercises={this.props.exercises}/>
                    <input type="submit" name="submit" onClick={this.submitHandler}/>
                </form>
            </div>
        )
    }
}

export default withExerciseContext(FormSubmitWrapper);