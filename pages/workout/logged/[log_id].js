import fetch from 'isomorphic-unfetch';

import ExerciseProvider from '../../../components/workoutLog/contextConfig';
import FormSubmitWrapper from '../../../components/workoutLog/formSubmitWrapper';

import Layout from '../../../components/util/layout';

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
            <Layout title='Workout'>
                <ExerciseProvider workout={this.props.workout} exercises={this.props.exercises}>
                    <FormSubmitWrapper {...this.props}/>
                </ExerciseProvider>
            </Layout>
        );
    }
}

export default LoggedWorkout;