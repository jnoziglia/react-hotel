import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import './bootstrap.css';
import './font-awesome.min.css';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Collapse from 'rc-collapse';
var Panel = Collapse.Panel;
require('rc-collapse/assets/index.css');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {hotels: {}, stars: {
        'all': true,
        5: false,
        4: false,
        3: false,
        2: false,
        1: false
      }};
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    //this.state = {hotels: {}};
  }

  handleChange(value) {
    this.setState({
      hotels: value
    });
  }

  handleCheckboxClick(value) {
    this.setState({
      stars: value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Sidebar onChange={this.handleChange} handleCheckboxClick={this.handleCheckboxClick} />
          <HotelList hotels={this.state.hotels} filters={this.state.stars} />
        </div>
      </div>
    );
  }
}

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    console.log(props);
  }

  handleButtonClick(e) {
    e.preventDefault();
    var that = this;
    var query = {
      origin: 'asd',
      start: 'asd',
      end: 'asd',
      rooms: 'asd',
      adults: 'asd',
      minors: 'asd'
    };
    console.log(this);
    request
    .get('https://api.myjson.com/bins/v0sqv')
    .query(query)
    .end(function(err, res){
      console.log(res.text);
      console.log(that);
      
      that.props.onChange(JSON.parse(res.text));
    });
  }

  handleCheckboxClick(value) {
    this.props.handleCheckboxClick(value);
  }

  render() {
    return (
      <div className="col-md-3">
        <div className="search-form">
          <div className="search-form-title">Hoteles</div>
          <form>
            <div className="row">
              <div className="col-xs-12">
                <label for="dest">Donde quieres ir?</label>
                <input type="text" className="form-control" id="dest" placeholder="Donde quieres ir?" />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <label for="dest">En que fecha?</label>
              </div>
              <div className="col-xs-6 reduced-right-padding">
                <DatePicker dateFormat="YYYY-MM-DD" />
              </div>
              <div className="col-xs-6 reduced-left-padding">
                <DatePicker dateFormat="YYYY-MM-DD" />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 reduced-right-padding">
                <label for="dest">Habitaciones</label>
                <select>
                  <option value="1">1</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 reduced-right-padding">
                <label for="dest">Adultos</label>
                <select>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
              <div className="col-xs-6 reduced-left-padding">
                <label for="dest">Menores</label>
                <select>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                </select>
              </div>
            </div>
            <button className="btn btn-default" onClick={this.handleButtonClick}>Buscar</button>
          </form>
        </div>
        <div className="star-filter">
          <Collapse accordion={true}>
            <Panel header="Estrellas" headerClass="my-header-class">
              <StarFilter handleCheckboxClick={this.handleCheckboxClick} />
            </Panel>
          </Collapse>
        </div>
      </div>
    )
  }
}

class StarFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'all': true,
      5: false,
      4: false,
      3: false,
      2: false,
      1: false
    };
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  handleCheckboxClick(e) {
    var stars = this.state;
    if(e.target.checked) {
      stars[e.target.value] = true;
    }
    else {
      stars[e.target.value] = false;
    }
    this.setState(stars);
    this.props.handleCheckboxClick(stars);
  }

  render() {
    var starsArray = [];
    for (var i in this.state) {
      if (i != 'all') {
        var starIcons = [];
        for (var j = 0; j < i; j++) {
          starIcons.push(<i className="fa fa-star" aria-hidden="true"></i>);
        }
        starsArray.push((
          <li className="list-group-item">
            <label>
              <input type="checkbox" value={i} onClick={this.handleCheckboxClick} />
              <span className="stars">
                {starIcons}
              </span>
              <span className="quantity">3</span>
            </label>
          </li>
        ));
      }
    }

    return (
      <ul className="list-group">
        <li className="list-group-item">
          <label>
            <input type="checkbox" value="all" defaultChecked onClick={this.handleCheckboxClick} />
            <span>
              Todas las estrellas
            </span>
            <span className="quantity-all">3</span>
          </label>
        </li>
        {starsArray}
      </ul>
    )
  }
}

class HotelList extends Component {
  render() {
    console.log(this.props.filters);
    var json = this.props.hotels;
    var hotelArray = [];
    for (var i in json) {
      console.log(this.props.filters[json[i].stars]);
      if(this.props.filters[json[i].stars] || this.props.filters['all']) {
        hotelArray.push(<Hotel hotelInfo={json[i]} />);
      }
    }
    return (
      <div className="col-md-9" id="hotel-card-container">
        {hotelArray}
      </div>
    );
  }
}

class Hotel extends Component {
  render() {
    var stars = [];
    for(var i = 0; i < this.props.hotelInfo.stars; i++) {
      stars.push(<i className="fa fa-star" aria-hidden="true"></i>);
    }
    return (
      <div className="hotel-card container-fluid">
        <div className="row">
          <div className="col-sm-9 hotel-info-left">
            <div className="hotel-title">
              <span className="hotel-rating">{this.props.hotelInfo.rating}</span>
              <span className="hotel-name">{this.props.hotelInfo.name}</span>
            </div>
            <div className="hotel-subtitle">
              <span className="stars">
                {stars}
              </span>
              <span className="distance">{this.formatDistance(this.props.hotelInfo.distanceFromDowntown)} del centro</span>
            </div>
            <div className="reccomend">{this.props.hotelInfo.recomendations} lo recomendo</div>
            <div className="rooms-left">{this.formatRooms(this.props.hotelInfo.availableRooms)}</div>
            <div className="time-left">asd</div>
          </div>
          <div className="col-sm-3 hotel-info-right">
            <div className="free-cancel">{this.formatCancelation(this.props.hotelInfo.freeCancelation)}</div>
            <div className="room-night">Habitacion por noche</div>
            <div className="taxes">Impuestos y tasas no incluidos</div>
            <div className="old-price">{this.formatPrice(this.props.hotelInfo.oldPrice)}</div>
            <div className="price">{this.formatPrice(this.props.hotelInfo.price)}</div>
            <div className="details">
              <button className="btn btn-default">Ver detalle</button>
            </div>
            <div className="payment-type">Paga al hotel o hasta en 50 cuotas!</div>
          </div>
        </div>
      </div>
    )
  }

  formatDistance(distance) {
    if(distance > 1000) {
      return Number(parseFloat(distance/1000).toFixed(2)).toLocaleString('es-AR') + ' km';
    }
    else {
      return distance + ' m';
    }
  }

  formatRooms(roomsLeft) {
    switch(roomsLeft) {
      case 1:
        return 'Ultima oportunidad! Queda una sola habitacion!';
      case null:
        break;
      default:
        return 'Ultimas '+roomsLeft+' habitaciones';
    }
  }

  formatCancelation(freeCancelation) {
    return this.props.hotelInfo.freeCancelation ? 'Cancele gratis' : null;
  }

  formatPrice(price) {
    if(price) {
      var priceArray = price.toString().split('.');
      priceArray[0] = Number(priceArray[0]).toLocaleString('es-AR');
      return (<span>$ <span>{priceArray[0]}<sup>{priceArray[1]}</sup></span></span>)
    }
    else {
      return null;
    }
  }
}

export default App;
