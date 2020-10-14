import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
}));

const Overview = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const data = {
    followers: '1000',
    likes: '800',
    posts: '200',
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="center" container justify="space-between">
        <Grid item md={3} sm={6} xs={12}>
          <Typography
            className={classes.title}
            component="h2"
            gutterBottom
            variant="overline"
          >
            Followers
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3">{data.followers}</Typography>
          </div>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Typography
            className={classes.title}
            component="h2"
            gutterBottom
            variant="overline"
          >
            POST
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3">{data.posts}</Typography>
          </div>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Typography
            className={classes.title}
            component="h2"
            gutterBottom
            variant="overline"
          >
            Likes
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3">{data.likes}</Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

Overview.propTypes = {
  className: PropTypes.string,
};

export default Overview;
