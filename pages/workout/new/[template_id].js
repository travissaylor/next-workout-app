import fetch from 'isomorphic-unfetch';

import ExerciseProvider from '../../../components/workoutInProgress/contextConfig';
import FormSubmitWrapper from '../../../components/workoutInProgress/formSubmitWrapper';

class NewWorkout extends React.Component {

    static async getInitialProps({query}) {
        const endpoint = `http://localhost:3000/api/get/workoutfromtemplate?template_id=${query.template_id}`;

        const res = await fetch(endpoint);

        if(!res.ok){
            console.log('API Fail', res);
            return;
        }

        const data = await res.json();
        data.workout.source = 'new';

        return data;
    }

    render() {

        console.log('workout',this.props.workout)
        return(
            <div>
                <ExerciseProvider workout={this.props.workout} exercises={this.props.exercises}>
                    <FormSubmitWrapper {...this.props}/>
                </ExerciseProvider>
            </div>
        );
    }
}

export default NewWorkout;