import React from "react";

const Article = ({ id, name, desc, isSelected, onClick, classes }) => {
  return (
    <article onClick={() => onClick(id)} className={classes}>
      <h2>{name}</h2>
      {isSelected && <p>{desc}</p>}
    </article>
  );
};

export default Article;
