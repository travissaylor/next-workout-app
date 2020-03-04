import fetch from 'isomorphic-unfetch';

import ExerciseProvider from '../../../components/workoutInProgress/contextConfig';
import FormSubmitWrapper from '../../../components/workoutInProgress/formSubmitWrapper';

class LoggedWorkout extends React.Component {

    static async getInitialProps({query}) {
        const endpoint = `http://localhost:3000/api/get/workoutfromlog?log_id=${query.log_id}`;

        const res = await fetch(endpoint);

        if(!res.ok){
            console.log('API Fail', res);
            return;
        }

        const data = await res.json();
        data.workout.source = 'logged';

        return data;
    }

    render() {
        console.log('props', this.props);
        return(
            <div>
                <ExerciseProvider workout={this.props.workout} exercises={this.props.exercises}>
                    <FormSubmitWrapper {...this.props}/>
                </ExerciseProvider>
            </div>
        );
    }
}

export default LoggedWorkout;