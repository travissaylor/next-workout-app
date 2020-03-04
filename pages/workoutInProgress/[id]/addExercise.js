import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const SearchResults = function({results, workoutId}) {

    if(results.length === 0) {
        return null;
    }

    const encodeMappedResult = function(result) {
        const exercise = {
            id: result.id,
            template_id: result.template_id,
            name: result.name,
            muscle_group: result.muscle_group,
            sets: [{weight: null, reps: null, notes: ''}]
        }
        return encodeURI(JSON.stringify(exercise));
    }

    return(
        <div>
            {results.map(function(result, index) {
                console.log('result', result);
                return (
                    <div key={index}>
                        <h3>{result.name}</h3>
                        <p>Muscle Group: {result.muscle_group}</p>
                        <Link href={'/workoutInProgress/' + workoutId +'?addExercise=' + encodeMappedResult(result)}>
                            <button>Use Exercise</button>
                        </Link>
                    </div>
                )
            }.bind(this))}
        </div>
    )   
}

class AddExercise extends React.Component {
    static async getInitialProps({query}) {
        return {workoutId: parseInt(query.id)}
    }

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            loading: false,
            searchResults: []
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        e.preventDefault();
        this.setState({
            searchText: e.target.value
        })
    }

    async handleSearch(e) {
        e.preventDefault();
        this.setState({loading: true});

        const results = await this.fetchSearchedExercises(this.state.searchText);

        this.setState({searchResults: results, loading: false});
    }

    async fetchSearchedExercises(searchTerm) {
        const pageRequest = `http://localhost:3000/api/GetExerciseTemplates?term=${searchTerm}`;

        const res = await fetch(pageRequest);

        if(!res.ok) {
            console.log('Error getting search results', res);
            return;
        }

        const json = await res.json();

        return json.exercises
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSearch}>
                    <p>Search Exercises: <input onChange={this.handleChange} name='search' type='text'/></p>
                    <button disabled={this.state.loading} type='submit'>Search</button>
                </form>
                <SearchResults workoutId={this.props.workoutId} results={this.state.searchResults}/>
            </div>
        )
    }
}

export default AddExercise;