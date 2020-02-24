import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

import WorkoutPreviewModule from '../components/workoutPreviewModule';
import ProgramPreviewModule from '../components/programPreviewModule';

class Home extends React.Component {

    static async getInitialProps({req}) {
        const protocol = req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] : 'http';
        const host = req ? req.headers['x-forwarded-host'] : location.host;
        const id = 1; // Replicating User Login

        const pageRequest = `${protocol}://${host}/api/GetUser?id=${id}`;

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
            <div>
                <h1>Trav's Workout App</h1>
                <WorkoutPreviewModule user={user.id} />
                <ProgramPreviewModule user={user.id} />
                <div>
                    <h3>Previous Workouts</h3>
                    <Link href="/" >
                        <button>View Previous Workouts</button>
                    </Link>
                </div>
            </div>
        )      
    }
}

export default Home;