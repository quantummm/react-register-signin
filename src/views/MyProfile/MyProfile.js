import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '../../components/Typography/Typography';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    display: 'grid',
    gridTemplateColumns: '640px 640px',
    gridGap: '10px'
  }
});


function MyProfile(props) {
  const { classes } = props;

  

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        My Portfolio 
      </Typography>
      <div className={classes.images}>
         My Profile
      </div>
    </Container>
  );
}

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyProfile);
