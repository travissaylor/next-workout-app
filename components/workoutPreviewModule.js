import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { Grid, Button, withStyles } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import theme from '../styles/theme';

const styles = {
    button: {
        margin: theme.spacing(1),
        textAlign: 'center'
    },
    card: {
        textAlign: 'center', 
        border: '1px solid #000000'
    }
}

class WorkoutPreviewModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            title: 'loading workout',
            time: 'loading time',
            session_type: 'loading type',
            split_type: 'split',
            loading: true
        }
        console.log("user props", this.props.user);
    }

    async componentDidMount() {
        const pageRequest = `http://localhost:3000/api/getworkouttemplate?id=${this.props.user}`;

        const res = await fetch(pageRequest);
        const json = await res.json();

        console.log('workout incoming data', json);

        this.setState({
            id: json.workout.log_id,
            time: json.workout.total_time,
            session_type: json.workout.session_type,
            split_type: json.workout.split_type,
            loading: false
        })
        
    }

    render() {
        const {classes} = this.props;

        return (
                <Grid container spacing={0} className={classes.card}>
                    <Grid item xs={12}>
                        <h3>Next Workout</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>{this.state.session_type} {this.state.split_type}</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Time</p>
                        <h6>{this.state.time}</h6>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Session Type</p>
                        <h6>{this.state.session_type}</h6>
                    </Grid>
                    <Grid item xs={12}>
                        <Link href={'/workout/logged/' + this.state.id}>
                            {/* <button>Overview</button> */}
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<FitnessCenterIcon />}
                            >Overview</Button>
                        </Link>
                    </Grid>
                </Grid>
        );
    }
}

export default withStyles(styles)(WorkoutPreviewModule);