import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    var options = []
    for (var i = this.props.min; i <= this.props.max; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    return (
      <div>
        <label>{this.props.label}</label>
        <select onChange={this.handleChange}>
          {options}
        </select>
      </div>
    )
  }
}

export default Select;