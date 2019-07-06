import React, { Component } from "react";

class Color extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { isLocked, hex } = this.props;
    return (
      <section className="Color">
        <p className="Color-hex">{hex}</p>
        {/* <i
          className="Color-lock-icon material-icons"
          onClick={this.setState({ locked: !isLocked })}
        >
          {isLocked ? "lock" : "lock_open"}
        </i> */}
      </section>
    );
  }
}

export default Color;
