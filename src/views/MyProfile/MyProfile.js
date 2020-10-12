import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "../../components/Typography/Typography";
import request from "../../utils/request";
import { zodiacUrl } from "../../config/url";
import Article from "../Article/Article";

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
  },
  images: {
    display: "grid",
    gridTemplateColumns: "640px 640px",
    gridGap: "10px",
  },
  zodiacBody: {
    textAlign: "center",
    fontSize: 30,
  },
  point: {
    cursor: "pointer",
  },
});

const MyProfile = (props) => {
  const { classes } = props;
  const [result, setResult] = useState([]);
  const [selected, setSelected] = useState(-1);
  const handleClick = useCallback((id) => setSelected(id), []);

  useEffect(() => {
    const fetchZodiac = async () => {
      let url = "http://localhost:8088" + zodiacUrl;
      fetch(url)
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setResult(res);
        });
    };
    fetchZodiac();
    console.log(result);
  }, []);

  let list = null;
  if (result) {
    list = result.map((article) => (
      <Article
        key={article.id}
        {...article}
        isSelected={article.id === selected}
        onClick={handleClick}
        classes={classes.point}
      />
    ));
  }

  return (
    <Container className={classes.root} component="section">
      <Typography variant="h4" marked="center" align="center" component="h2">
        My Portfolio
      </Typography>
      <div className={classes.images}>My Profile</div>
      <div className={classes.zodiacBody}>{list}</div>
    </Container>
  );
};

MyProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default React.memo(withStyles(styles)(MyProfile));
