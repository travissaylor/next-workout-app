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

class PreviousWorkoutModule extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         id: null,
    //         title: 'loading workout',
    //         time: 'loading time',
    //         session_type: 'loading type',
    //         split_type: 'split',
    //         loading: true
    //     }
    //     console.log("user props", this.props.user);
    // }

    // async componentDidMount() {
    //     const pageRequest = `http://localhost:3000/api/getworkouttemplate?id=${this.props.user}`;

    //     const res = await fetch(pageRequest);
    //     const json = await res.json();

    //     this.setState({
    //         id: json.workout.template_id,
    //         time: json.workout.total_time,
    //         session_type: json.workout.session_type,
    //         split_type: json.workout.split_type,
    //         loading: false
    //     })
        
    // }

    render() {
        const {classes} = this.props;

        return (
            <Grid container spacing={0} className={classes.card}>
                <Grid item xs={12}>
                    <h3>Previous Workouts</h3>
                </Grid>
                <Grid item xs={12}>
                    <Link href="/" >
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<FitnessCenterIcon />}
                        >View Previous Workouts</Button>
                    </Link>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(PreviousWorkoutModule);