import React, { Component } from 'react';
import './Hotel.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Loader from 'halogen/ScaleLoader';

class HotelList extends Component {
  render() {
    if (this.props.loading) {
      return(
        <div className="loader col-md-9">
          <Loader color="#0050d0" size="3em" margin="4px"/>
        </div>
      )
    }
    else {
      return (
        <div className="col-md-9" id="hotel-card-container">
          <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            {this.props.hotels}
          </ReactCSSTransitionGroup>
        </div>
      )
    }
  }
}

export default HotelList;