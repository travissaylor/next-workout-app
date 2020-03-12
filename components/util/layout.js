import {Container, Box} from '@material-ui/core';

import TopNav from './topNav';

class Layout extends React.Component {
    
    constructor(props) {
        super(props);
        console.log('Props');
    }
    render() {
        console.log('Layout Props', this.props)

        return(
            <Box>
                <TopNav pageName={this.props.title}/>
                <Container maxWidth="lg">
                    {this.props.children}
                </Container>
            </Box>
        )
    }
}

export default Layout;