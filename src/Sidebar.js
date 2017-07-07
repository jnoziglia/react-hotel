import React, { Component } from 'react';
import StarFilter from './StarFilter.js';
import Form from './Form.js';
import Hotel from './Hotel.js';
import Collapse, {Panel} from 'rc-collapse';
//var Panel = Collapse.Panel;
require('rc-collapse/assets/index.css');

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.processHotels = this.processHotels.bind(this);
    this.state = {
      hotels: {},
      hotelsArray: [],
      starsQuantity: {
        'all': 0,
        5: 0,
        4: 0,
        3: 0,
        2: 0,
        1: 0
      },
      starsFilter: {
        'all': true,
        5: false,
        4: false,
        3: false,
        2: false,
        1: false
      }
    }
  }

  processHotels(hotels, starsFilter) {
    var hotelsArray = [];
    var starsQuantity = {
      'all': 0,
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };
    for (var i in hotels) {
      starsQuantity[hotels[i].stars]++;
      starsQuantity['all']++;
      if(starsFilter[hotels[i].stars] || starsFilter['all']) {
        console.log('pushed');
        hotelsArray.push(<div key={i}><Hotel hotelInfo={hotels[i]} /></div>);
      }
    }
    this.setState({
      starsQuantity: starsQuantity,
      hotelsArray: hotelsArray,
      hotels: hotels,
      starsFilter: starsFilter
    });
    this.props.onChange(hotelsArray);
  }

  handleCheckboxClick(value) {
    // this.setState({
    //   starsFilter: value
    // });
    console.log(this.state.starsFilter);
    if(this.state.hotels) {
      this.processHotels(this.state.hotels, value);
    }
  }

  handleChange(value) {
    // this.props.onChange(value);
    // this.setState({
    //   hotels: value
    // });
    this.processHotels(value, this.state.starsFilter);
  };

  handleLoad(value) {
    this.props.onLoad(value);
  }

  render() {
    return (
      <div className="col-md-3">
        <Collapse accordion={true} className="hidden-lg hidden-md form-accordion">
          <Panel header="Buscador" headerClass="mobile-search">
            <Form onChange={this.handleChange} onLoad={this.handleLoad} />
          </Panel>
        </Collapse>
        <div className="hidden-sm hidden-xs">
          <Form onChange={this.handleChange} onLoad={this.handleLoad} />
        </div>
        <div className="star-filter">
          <Collapse accordion={true}>
            <Panel header="Estrellas" headerClass="star-accordion">
              <StarFilter handleCheckboxClick={this.handleCheckboxClick} starsQuantity={this.state.starsQuantity} />
            </Panel>
          </Collapse>
        </div>
      </div>
    )
  }
}

export default Sidebar;