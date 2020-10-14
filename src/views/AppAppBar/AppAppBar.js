import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles, useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Setting from '@material-ui/icons/SettingsApplicationsSharp';
import Explore from '@material-ui/icons/ExploreSharp';
import Account from '@material-ui/icons/AccountBoxSharp';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '../../components/AppBar/AppBar';
import Toolbar, {
  styles as toolbarStyles,
} from '../../components/Toolbar/Toolbar';

import { useLocation, useHistory } from 'react-router-dom';
import { signOutUrl } from '../../config/url';
import request from '../../utils/request';
import { CURRENT_USER } from '../../constants/applicationConstants';

import { getInitAuthData as authInfo } from '../../utils/help';

const drawerWidth = 240;

const styles = (theme) => ({
  title: {
    fontSize: 24,
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const history = useHistory();
  const { classes } = props;
  const theme = useTheme();
  const location = useLocation();

  const authData = authInfo();

  const [open, setOpen] = useState(false);
  const pathLocation = ['/profile', '/setting', '/zodiac'];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onMenuClick = (e) => {
    console.log(e.target.textContent);

    history.push(`/${e.target.textContent}`);
  };

  const logout = async () => {
    try {
      const currentUserStr = localStorage.getItem(CURRENT_USER);
      if (currentUserStr) {
        const currentUserData = JSON.parse(currentUserStr);
        const resp = await request(signOutUrl, {
          method: 'POST',
          body: JSON.stringify(currentUserData.currentUser),
        });
        localStorage.removeItem(CURRENT_USER);
        history.push('/signin');
      }
    } catch (error) {}
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'ltr' ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                {['setting', 'zodiac', 'profile'].map((text, index) => (
                  <ListItem button key={text} onClick={onMenuClick}>
                    <ListItemIcon>
                      {text === 'Setting' ? (
                        <Setting />
                      ) : text === 'Zodiac' ? (
                        <Explore />
                      ) : (
                        <Account />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </div>
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'ecommerce platform'}
          </Link>
          <div className={classes.right}>
            {pathLocation.includes(location.pathname) && (
              <Link
                color="inherit"
                variant="button"
                underline="none"
                className={clsx(classes.rightLink, {
                  [classes.linkSecondary]: pathLocation.includes(
                    location.pathname
                  ),
                })}
                onClick={logout}
              >
                {'Logout'}
              </Link>
            )}
            {(location.pathname === '/signin' ||
              location.pathname === '/signup') && (
              <>
                <Link
                  color="inherit"
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink, {
                    [classes.linkSecondary]: location.pathname === '/signin',
                  })}
                  href="/signin"
                >
                  {'Sign In'}
                </Link>
                <Link
                  variant="h6"
                  underline="none"
                  className={clsx(classes.rightLink, {
                    [classes.linkSecondary]: location.pathname === '/signup',
                  })}
                  href="/signup"
                >
                  {'Sign Up'}
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
