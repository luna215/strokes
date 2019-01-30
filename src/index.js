import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Strokes extends Component {

    constructor(props) {
        super(props);

        // INITIALIZING VARAIBLES HERE
        this.mouseDown = false;
        this.myRef = React.createRef();
        this.namespace = 'http://www.w3.org/2000/svg';

        // BINDING FUNCTIONS HERE
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
                        {/* TODO: Append the circles here to create a path. */}
                    </g>
                </svg>
            </div>
        )
    }

    componentDidMount() {
        this.gElement = document.getElementsByClassName('circles')[0];
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
        circle.setAttribute('r', '2');
        circle.setAttribute('fill', 'orange');
        circle.setAttribute('cx', `${svgP.x}`);
        circle.setAttribute('cy', `${svgP.y}`);
        circle.setAttribute('class', 'stroke');
        // TODO: Append circle to g element with the className circles
        this.gElement.append(circle);

        console.log(`${svgP.x}, ${svgP.y}`);

        console.log(`${event.clientX}, ${event.clientY}`);
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
