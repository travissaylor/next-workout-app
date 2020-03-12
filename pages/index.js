import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

import WorkoutPreviewModule from '../components/workoutPreviewModule';
import ProgramPreviewModule from '../components/programPreviewModule';
import PreviousWorkoutModule from '../components/previousWorkoutsModule';

// import TopNav from '../components/util/topNav';
import Layout from '../components/util/layout';
import { Grid } from '@material-ui/core';

class Home extends React.Component {

    static async getInitialProps({req}) {
        // const protocol = 'http';
        // const host = req ? req.headers['x-forwarded-host'] : location.host;
        const id = 1; // Replicating User Login

        console.log("Base url", process.env.API_BASE_URL);

        const pageRequest = `${process.env.API_BASE_URL || 'http://localhost:3000'}/api/GetUser?id=${id}`;

        const res = await fetch(pageRequest);
        const json = await res.json();

        return json;
    }

    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props;

        return(
            <Layout title='Dashboard'>
                <h1>Trav's Workout App</h1>
                <Grid container spacing={2}>
                    <Grid container item xs={12} sm={6}>
                        <WorkoutPreviewModule user={user.current_workout_id} />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                        <ProgramPreviewModule user={user.id} />
                    </Grid>
                    <Grid container item xs={12} sm={6}>
                        <PreviousWorkoutModule user={user.id} />
                    </Grid>
                </Grid>
            </Layout>
        )      
    }
}

export default Home;