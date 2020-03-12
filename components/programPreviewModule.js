import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { Grid, Button, withStyles } from '@material-ui/core';
import DescriptionIcon from '@material-ui/icons/Description';

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

class ProgramPreviewModule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: 'loading program',
            length: 'loading length',
            frequency: 'loading frequency',
            id: null,
            loading: true
        }
    }

    async componentDidMount() {
        const pageRequest = `http://localhost:3000/api/getprogram?id=${this.props.user}`;

        const res = await fetch(pageRequest);
        const json = await res.json();
        console.log('API Data', json);

        this.setState({
            title: json.program.name,
            length: json.program.total_length,
            frequency: json.program.frequency,
            id: json.program.id,
            loading: false
        })
        
    }

    render() {
        const {classes} = this.props;
        console.log('preview state', this.state);
        return (
                <Grid container spacing={0} className={classes.card}>
                    <Grid item xs={12}>
                        <h3>Current Program</h3>
                    </Grid>
                    <Grid item xs={12}>
                        <h4>{this.state.title}</h4>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Program Length</p>
                        <h6>{this.state.length} weeks</h6>
                    </Grid>
                    <Grid item xs={6}>
                        <p>Workouts / Week</p>
                        <h6>{this.state.frequency}</h6>
                    </Grid>
                    <Grid item xs={12}>
                        <Link href={'/programOverview/' + this.state.id}>
                            <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<DescriptionIcon />}
                                >View Program Details</Button>
                        </Link>
                    </Grid>
                </Grid>
        );
    }
}

export default withStyles(styles)(ProgramPreviewModule);