import React from "react";

const Entry = ({ entry }) => {
  return (
    <ul>
      {entry.map((num) => {
        return <li>{num}</li>;
      })}
    </ul>
  );
};

export default Entry;
