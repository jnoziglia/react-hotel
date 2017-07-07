import React, { Component } from 'react';

class InputError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={this.props.visible ? 'error' : 'hidden'}>{this.props.message}</div>
    )
  }
}

export default InputError;