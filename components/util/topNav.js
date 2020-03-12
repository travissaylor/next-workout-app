import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListIcon from '@material-ui/icons/List';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import GitHubIcon from '@material-ui/icons/GitHub';

import theme from '../../styles/theme';
import Link from 'next/link';

const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
};

class TopNav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);

    }

    toggleMenu() {
        this.setState({open: !(this.state.open)});
    }

    mapMenuItems() {
      const primaryItems = [{name:'Home', url: '/', icon: <HomeIcon />}, {name:'New Workout', url: '/workout/new/1', icon: <AddCircleIcon />}, {name:'Workout Templates', url: '/workout/new/1', icon: <ListIcon />}, {name:'Previous Workouts', url: '/workout/logged/1', icon: <ScheduleIcon />}];
      const secondaryItems = [{name:'Login', url: '/', icon: <ExitToAppIcon />}, {name:'Report a Problem', url: '/', icon: <ReportProblemIcon />}, {name:'GitHub', url: '/', icon: <GitHubIcon />}];

      return (
        <>
          <List>
              {primaryItems.map((item, index) => (
                <Link href={item.url} key={index}>
                  <ListItem button>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
          </List>
          <Divider />
          <List>
             {secondaryItems.map((item, index) => (
                <Link href={item.url} key={index}>
                  <ListItem button>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              ))}
          </List>
      </>
      )

    }

    render() {
        const {classes, pageName} = this.props;
        return (
            <div>
                <div className={classes.root}>
                  <AppBar position="static">
                    <Toolbar>
                      <IconButton onClick={this.toggleMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" className={classes.title}>
                        {pageName}
                      </Typography>
                      <Button color="inherit">Login</Button>
                    </Toolbar>
                  </AppBar>
                </div>
                <Drawer open={this.state.open} onClose={this.toggleMenu}>
                    <div
                        className={classes.list}
                        role="presentation"
                        onClick={this.toggleMenu}
                        >
                        {this.mapMenuItems()}
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default withStyles(styles)(TopNav);