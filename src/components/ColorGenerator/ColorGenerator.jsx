import React, { Component } from 'react'
import randomColor from 'randomcolor';
export class ColorGenerator extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    componentDidMount() {
        this.generateHex();
    }
    generateHex = () => {
        const colors = randomColor();
        
    }
    render() {
        return (
            <div className="ColorGenerator">
                
            </div>
        )
    }
}

export default ColorGenerator
