import React, { Component } from "react";
import randomColor from "randomcolor";
import Color from "../Color/Color";
export class ColorGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      colors: [
        { isLocked: false, number: 1, hex: "#ffffff" },
        { isLocked: false, number: 2, hex: "#ffffff" },
        { isLocked: false, number: 3, hex: "#ffffff" },
        { isLocked: false, number: 4, hex: "#ffffff" },
        { isLocked: false, number: 5, hex: "#ffffff" }
      ]
    };
  }
  componentDidMount() {
    this.generateHex();
    this.createColors();
  }
  generateHex = () => {
    let colorsArr = [];
    let colors = this.state.colors;
    colors.map(color => {
      if (!color.isLocked) color.hex = randomColor();
      colorsArr.push(color);
    });
    this.setState({ colors: colorsArr });
  };
  createColors = () => {
    const { colors } = this.state;
    const colorArr = colors.map(color => {
      return <Color isLocked={color.isLocked} key={color.number} hex={color.hex} />;
    });
    return colorArr;
  };
  render() {
    return <div className="ColorGenerator">{this.createColors()}</div>;
  }
}

export default ColorGenerator;
