import React, {Component} from 'react';

export default class Colors extends Component {
    constructor(props) {
        super(props);

        this.hexValue = '';

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return([
            <input placeholder='HEX value' type="text" onChange={this.handleChange} required/>,
            <button onClick={this.handleSubmit}>Change</button>
        ]);
    }

    handleChange(event) {
        this.hexValue = event.target.value;
        console.log(event.target.value);
    }
    handleSubmit(event) {
        this.props.sendValue(this.hexValue);
    }
}
