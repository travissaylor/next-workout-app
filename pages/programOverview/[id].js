import fetch from 'isomorphic-unfetch';

class WorkoutOverview extends React.Component {
    
    static async getInitialProps({req, query}) {
        const protocol = req.headers['x-forwarded-proto'] ? req.headers['x-forwarded-proto'] : 'http';
        const host = req ? req.headers['x-forwarded-host'] : location.host;

        const pageRequest = `${protocol}://${host}/api/GetProgram?id=${query.id}`;

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
        const {phases} = this.props.data;
        const {name, total_length, frequency, split_type, description} = this.props.data.program;
        return(
            <div>
                <h1>{name}</h1>
                <p>{total_length} weeks</p>
                <p>{frequency} workouts / week</p>
                <p>{split_type} split</p>
                <p>{description}</p>
                <h3>Phases:</h3>
                {phases.map(function(phase, index) {
                    return(
                        <div key={index}>
                            <h4>{phase.name}</h4>
                            <p>{phase.total_length} weeks</p>
                            <p>{phase.focus}</p>
                            <p>{phase.description}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default WorkoutOverview;