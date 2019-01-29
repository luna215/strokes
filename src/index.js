import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Strokes extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();

        this.handleDrag = this.handleDrag.bind(this);
        this.refCallBack = this.refCallBack.bind(this);
    }
    render() {
        return (
            <div className="canvas">
                <svg 
                ref={this.refCallBack}
                onMouseMove={this.handleDrag}
                viewBox="0 0 800 400">
                    <g className="circles">
                        {/* TODO: Append the circles here to create a path. */}
                    </g>
                </svg>
            </div>
        )
    }

    handleDrag(event) {
        const pt = this.myRef.createSVGPoint();
        pt.x = event.clientX;
        pt.y = event.clientY;
        const svgP = pt.matrixTransform(this.myRef.getScreenCTM().inverse());

        console.log(`${svgP.x}, ${svgP.y}`);

        console.log(`${event.clientX}, ${event.clientY}`);
    }

    refCallBack(element) {
        if(element) {
            this.myRef = element;
        }
    }

}

ReactDOM.render(<Strokes />, document.getElementById('root'));
