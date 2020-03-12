import fetch from 'isomorphic-unfetch';

import TemplateProvider from '../../../components/workoutTemplate/templateContext';
import FormSubmitWrapper from '../../../components/workoutTemplate/formSubmitWrapper';
import Layout from '../../../components/util/layout';

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
        return(
            <Layout title="Workout Template">
                <TemplateProvider workout={this.props.workout} exercises={this.props.exercises}>
                    <FormSubmitWrapper {...this.props}/>
                </TemplateProvider>
            </Layout>
        );
    }
}

export default NewWorkout;