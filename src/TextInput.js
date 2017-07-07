import React, { Component } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    return(
      <div>
        <label>{this.props.label}</label>
        <input type="text" className="form-control" placeholder={this.props.placeholder} onChange={this.handleChange} />
      </div>
    )
  }
}

export default TextInput;