import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '../../components/Typography/Typography';
import Card from '../../components/Card/Card';
import request from '../../utils/request';
import { zodiacUrl } from '../../config/url';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    display: 'grid',
    gridTemplateColumns: '640px 640px',
    gridGap: '10px',
    marginTop: theme.spacing(2),
  },
});

function Zodiac(props) {
  const { classes } = props;
  const [zodiac, setZodiac] = useState([]);

  useEffect(() => {
    request(zodiacUrl)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setZodiac(res);
      });
  }, []);

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        Zodiac
      </Typography>
      <div className={classes.images}>
        {zodiac.map((el, idx) => (
          <Card key={idx} zodiac={el} />
        ))}
      </div>
    </Container>
  );
}

Zodiac.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Zodiac);
