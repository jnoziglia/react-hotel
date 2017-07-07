import React, { Component } from 'react';
import Sidebar from './Sidebar.js';
import HotelList from './HotelList.js';
import logo from './logo.svg';
import './css/App.css';
import './css/style.css';
import './css/bootstrap.min.css';
import './css/font-awesome.min.css';
import 'react-datepicker/dist/react-datepicker.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hotels: [], 
      loading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
  }

  handleChange(value) {
    this.setState({
      hotels: value
    });
  }

  handleLoad(value) {
    this.setState({
      loading: value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Sidebar onChange={this.handleChange} onLoad={this.handleLoad} />
          <HotelList hotels={this.state.hotels} loading={this.state.loading} />
        </div>
      </div>
    );
  }
}

export default App;
