import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

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

        this.setState({
            title: json.program.name,
            length: json.program.total_length,
            frequency: json.program.frequnecy,
            id: json.program.id,
            loading: false
        })
        
    }

    render() {
        return (
                <div>
                    <h3>Current Program</h3>
                    <h4>{this.state.title}</h4>
                    <h6>{this.state.length} weeks</h6>
                    <h6>{this.state.frequency} workouts / week</h6>
                    <Link href={'/programOverview/' + this.state.id}>
                        <button>View Program Details</button>
                    </Link>
                </div>
        );
    }
}

export default ProgramPreviewModule;