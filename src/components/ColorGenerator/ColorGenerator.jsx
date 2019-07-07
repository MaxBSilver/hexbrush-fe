import React, { Component } from "react";
import randomColor from "randomcolor";
import Color from "../Color/Color";
export class ColorGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      colors: [
        { isLocked: false, id: 1, hex: "#ffffff" },
        { isLocked: false, id: 2, hex: "#ffffff" },
        { isLocked: false, id: 3, hex: "#ffffff" },
        { isLocked: true, id: 4, hex: "#ffffff" },
        { isLocked: false, id: 5, hex: "#ffffff" }
      ]
    };
  }
  componentDidMount() {
    this.generateHex();
    this.createColors();
  }
  generateHex = () => {
    const colors = this.state.colors.map(c => {
      if (!c.isLocked) {
        c.hex = randomColor();
      }
      return c;
    });
    this.setState({ colors: colors });
  };
  
  createColors = () => {
    const { colors } = this.state;
    const colorArr = colors.map(color => {
      return (
        <Color
          isLocked={color.isLocked}
          key={color.id}
          id={color.id}
          hex={color.hex}
          lockColor={this.lockColor}
        />
      );
    });
    return colorArr;
  };
  lockColor = id => {
    const colors = this.state.colors.map(color => {
      if (color.id === id) {
        color.isLocked = !color.isLocked;
      }
      return color;
    });
    this.setState({ colors });
  };
  render() {
    return (
      <div className="ColorGenerator">
        <section>{this.createColors()}</section>
        <section>
          <button onClick={this.generateHex}>Generate new colors</button>
        </section>
      </div>
    );
  }
}

export default ColorGenerator;
