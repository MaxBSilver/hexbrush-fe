import React, { Component } from "react";

const Color = (props) => {
  const { isLocked, hex, id } = props;
  return (
    <section className="Color" style={{ backgroundColor: hex }}>
      <p className="Color-hex">{hex}</p>
      <i
        className="Color-lock-icon material-icons"
        onClick={() => props.lockColor(id)}
      >
        {isLocked ? "lock" : "lock_open"}
      </i>
    </section>
  );
};

export default Color;
