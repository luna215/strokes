import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import Colors from './Colors';

class Strokes extends Component {

    constructor(props) {
        super(props);

        this.hexValue = '#FF7E47';

        // INITIALIZING VARAIBLES HERE
        this.mouseDown = false;
        this.myRef = React.createRef();
        this.namespace = 'http://www.w3.org/2000/svg';

        // BINDING FUNCTIONS HERE
        this.setHexValue = this.setHexValue.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.refCallBack = this.refCallBack.bind(this);
    }
    render() {
        return (
            <div className="canvas">
                <svg 
                ref={this.refCallBack}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleDrag}
                onMouseUp={this.handleMouseUp}
                viewBox="0 0 800 400">
                    <g className="circles">
                    </g>
                </svg>
                <Colors sendValue={this.setHexValue} />
            </div>
        )
    }

    componentDidMount() {
        this.gElement = document.getElementsByClassName('circles')[0];
    }

    setHexValue(hexValue) {
        this.hexValue = hexValue;
    }

    handleMouseDown(event) {
        this.mouseDown = true;
    }

    handleDrag(event) {
        if(!this.mouseDown) { return;} 
        const pt = this.myRef.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        const svgP = pt.matrixTransform(this.myRef.getScreenCTM().inverse());
        let circle = document.createElementNS(this.namespace, 'circle');
        circle.setAttribute('r', '10');
        circle.setAttribute('fill', `${this.hexValue}`);
        circle.setAttribute('cx', `${svgP.x}`);
        circle.setAttribute('cy', `${svgP.y}`);
        circle.setAttribute('class', 'stroke');
        this.gElement.append(circle);
    }

    handleMouseUp(event) {
        this.mouseDown = false;
    }

    refCallBack(element) {
        if(element) {
            this.myRef = element;
        }
    }

}

ReactDOM.render(<Strokes />, document.getElementById('root'));
