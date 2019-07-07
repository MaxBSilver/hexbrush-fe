import React, { Component } from 'react'
import ColorGenerator from '../ColorGenerator/ColorGenerator';

export class ColorView extends Component {
    render() {
        return (
            <div>
                <ColorGenerator projects={this.props.projects}/>
            </div>
        )
    }
}

export default ColorView
