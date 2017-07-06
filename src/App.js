import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import './bootstrap.css';
import './font-awesome.min.css';
import request from 'superagent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
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
    this.state = {
      inDate: null,
      outDate: null,
      minOutDate: moment(),
      maxOutDate: moment().add(30, 'days'),
      origin: '',
      rooms: 1,
      adults: 1,
      minors: 0,
      formErrors: {
        origin: {visible: false, message: ''},
        inDate: {visible: false, message: ''},
        outDate: {visible: false, message: ''},
        rooms: {visible: false, message: ''},
        adults: {visible: false, message: ''},
        minors: {visible: false, message: ''}
      }
    };
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
    this.handleInDate = this.handleInDate.bind(this);
    this.handleOutDate = this.handleOutDate.bind(this);
    this.handleOrigin = this.handleOrigin.bind(this);
    this.validate = this.validate.bind(this);
    this.validateOrigin = this.validateOrigin.bind(this);
    console.log(props);
  }

  handleButtonClick(e) {
    e.preventDefault();
    var valid = this.validate();
    if (valid) {
      var that = this;
      var query = {
        origin: this.state.origin,
        start: 'asd',
        end: 'asd',
        rooms: 'asd',
        adults: 'asd',
        minors: 'asd'
      }
      console.log(this);
      request
      .get('https://api.myjson.com/bins/v0sqv')
      .query(query)
      .end(function(err, res){
        that.props.onChange(JSON.parse(res.text));
      });
    };
    
  }

  handleCheckboxClick(value) {
    this.props.handleCheckboxClick(value);
  }

  handleInDate(date) {
    this.setState({
      inDate: date
    });
  }

  handleOutDate(date) {
    this.setState({
      outDate: date
    });
  }

  handleOrigin(value) {
    this.setState({
      origin: value
    });
  }

  validate() {
    var formErrors = this.state.formErrors;
    var valid = true;
    // VALIDATE ORIGIN
    if (!this.state.origin) {
      formErrors.origin.visible = true;
      formErrors.origin.message = 'Por favor completar este campo';
      valid = (valid && false);
    }
    else {
      formErrors.origin.visible = false;
      formErrors.origin.message = '';
    }

    //VALIDATE START DATE
    if (!this.state.inDate) {
      formErrors.inDate.visible = true;
      formErrors.inDate.message = 'Por favor completar este campo';
      valid = (valid && false);
    }
    else {
      formErrors.inDate.visible = false;
      formErrors.inDate.message = '';
    }

    //VALIDATE END DATE
    if (!this.state.outDate) {
      formErrors.outDate.visible = true;
      formErrors.outDate.message = 'Por favor completar este campo';
      valid = (valid && false);
    }
    else {
      formErrors.outDate.visible = false;
      formErrors.outDate.message = '';
    }

    this.setState({
      formErrors: formErrors
    });
    return valid;
  }

  validateOrigin() {
    
  }

  render() {
    return (
      <div className="col-md-3">
        <div className="search-form">
          <div className="search-form-title">Hoteles</div>
          <form>
            <div className="row">
              <div className="col-xs-12">
                <TextInput 
                  containerClasses="col-xs-12"
                  label="Donde quieres ir?"
                  placeholder="Donde quieres ir?"
                  onChange={this.handleOrigin} />
                <InputError
                  visible={this.state.formErrors.origin.visible}
                  message={this.state.formErrors.origin.message} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12">
                <label for="dest">En que fecha?</label>
              </div>
              <div className="col-xs-6 reduced-right-padding">
                <DatePicker 
                  dateFormat="YYYY/MM/DD" 
                  onChange={this.handleInDate} 
                  selected={this.state.inDate}
                  minDate={moment()}
                  maxDate={moment().add(365,'days')} />
                <InputError
                visible={this.state.formErrors.inDate.visible}
                message={this.state.formErrors.inDate.message} />
              </div>
              <div className="col-xs-6 reduced-left-padding">
                <DatePicker 
                  dateFormat="YYYY/MM/DD" 
                  onChange={this.handleOutDate} 
                  selected={this.state.outDate}
                  minDate={this.state.minOutDate}
                  maxDate={this.state.maxOutDate} />
                <InputError
                visible={this.state.formErrors.outDate.visible}
                message={this.state.formErrors.outDate.message} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 reduced-right-padding">
                <Select 
                  containerClasses="col-xs-6 reduced-right-padding"
                  min={1}
                  max={8}
                  label="Habitaciones"
                  onChange={this.handleRooms} />
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6 reduced-right-padding">
                <Select 
                  containerClasses="col-xs-6 reduced-right-padding"
                  min={1}
                  max={8}
                  label="Adultos"
                  onChange={this.handleAdults} />
              </div>
              <div className="col-xs-6 reduced-left-padding">
                <Select 
                  containerClasses="col-xs-6 reduced-left-padding"
                  min={0}
                  max={7}
                  label="Menores"
                  onChange={this.handleMinors} />
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
        <label for="dest">{this.props.label}</label>
        <input type="text" className="form-control" id="dest" placeholder={this.props.placeholder} onChange={this.handleChange} />
      </div>
    )
  }
}

class Select extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var options = []
    for (var i = this.props.min; i <= this.props.max; i++) {
      options.push(<option value={i}>{i}</option>);
    }
    return (
      <div>
        <label>{this.props.label}</label>
        <select>
          {options}
        </select>
      </div>
    )
  }
}

class InputError extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className={this.props.visible ? '' : 'hidden'}>{this.props.message}</div>
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
