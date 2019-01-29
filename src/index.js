import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Strokes extends Component {

    render() {
        return (
            <div className="canvas">
                <svg 
                onMouseMove={this.handleDrag}
                viewBox="0 0 800 400">
                    <g class="circles">
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
        const svgP = pt.matrix.Transform(this.myRef.getScreenCTM().inverse());


        console.log(`${event.clientX}, ${event.clientY}`);
    }
}

ReactDOM.render(<Strokes />, document.getElementById('root'));
