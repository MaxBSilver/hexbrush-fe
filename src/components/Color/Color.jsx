import React, { Component } from "react";

class Color extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { isLocked, hex, id } = this.props;
    return (
      <section className="Color" style={{backgroundColor: hex}}>
        <p className="Color-hex">{hex}</p>
        <i
          className="Color-lock-icon material-icons"
          onClick= {()=> this.props.lockColor(id)}
        >
          {isLocked ? "lock" : "lock_open"}
        </i>
      </section>
    );
  }
}

export default Color;
