import React, { Component } from 'react';
import TextInput from './TextInput.js';
import Select from './Select.js';
import InputError from './InputError.js';
import DatePicker from 'react-datepicker';
import request from 'superagent';
import moment from 'moment';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inDate: null,
      outDate: null,
      minOutDate: moment().add(1, 'days'),
      maxOutDate: moment().add(395, 'days'),
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
    this.handleInDate = this.handleInDate.bind(this);
    this.handleOutDate = this.handleOutDate.bind(this);
    this.handleOrigin = this.handleOrigin.bind(this);
    this.handleRooms = this.handleRooms.bind(this);
    this.handleAdults = this.handleAdults.bind(this);
    this.handleMinors = this.handleMinors.bind(this);
    this.validate = this.validate.bind(this);
  }

  handleButtonClick(e) {
    e.preventDefault();
    var valid = this.validate();
    if (valid) {
      this.props.onLoad(true);
      this.props.onChange(null);
      var that = this;
      var query = {
        origin: this.state.origin,
        start: (this.state.inDate).format('YYYY-MM-DD'),
        end: (this.state.outDate).format('YYYY-MM-DD'),
        rooms:  this.state.rooms,
        adults:  this.state.adults,
        minors:  this.state.minors
      }
      request
      .get('https://api.myjson.com/bins/v0sqv')
      .query(query)
      .end(function(err, res){
        that.props.onLoad(false);
        that.props.onChange(JSON.parse(res.text));
      });
    };
  }

  handleInDate(date) {
    if (date) {
        var maxOutDate = date.clone().add(30, 'days');
        var minOutDate = date.clone().add(1, 'days');
        if (this.state.outDate) {
          if (this.state.outDate.isAfter(maxOutDate)) {
            var outDate = null;
          }
          else if (this.state.outDate.isBefore(date)) {
            var outDate = date.clone().add(1, 'days');
          }
          else {
            var outDate = this.state.outDate;
          }
        }
        else {
          var outDate = this.state.outDate;
        }
    }
    else {
      var maxOutDate = moment().add(395, 'days');
      var minOutDate = moment().add(1, 'days');
      var outDate = this.state.outDate;
    }
    this.setState({
      inDate: date,
      outDate: outDate,
      maxOutDate: maxOutDate,
      minOutDate: minOutDate
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

  handleRooms(value) {
    this.setState({
      rooms: value
    });
  }

  handleAdults(value) {
    this.setState({
      adults: value
    });
  }

  handleMinors(value) {
    this.setState({
      minors: value
    });
  }

  
  validate() {
    var formErrors = this.state.formErrors;
    var valid = true;
    // VALIDATE ORIGIN
    if (!this.state.origin) {
      formErrors.origin.visible = true;
      formErrors.origin.message = 'Por favor completar este campo';
      valid = false;
    }
    else {
      formErrors.origin.visible = false;
      formErrors.origin.message = '';
    }
    console.log(this.state.inDate);
    //VALIDATE START DATE
    if (!this.state.inDate) {
      formErrors.inDate.visible = true;
      formErrors.inDate.message = 'Por favor completar este campo';
      valid = false;
    }
    else {
      formErrors.inDate.visible = false;
      formErrors.inDate.message = '';
    }

    //VALIDATE END DATE
    if (!this.state.outDate) {
      formErrors.outDate.visible = true;
      formErrors.outDate.message = 'Por favor completar este campo';
      valid = false;
    }
    else {
      formErrors.outDate.visible = false;
      formErrors.outDate.message = '';
    }

    if (this.state.inDate && this.state.outDate) {
      var endMoment = this.state.outDate.clone();
      var startMoment = this.state.inDate.clone();

      if (this.state.outDate.isBefore(this.state.inDate)) {
        formErrors.outDate.visible = true;
        formErrors.outDate.message = 'La fecha de salida no puede ser anterior a la de entrada';
        valid = false;
      }
      else if (this.state.inDate.isBefore(moment())) {
        formErrors.inDate.visible = true;
        formErrors.inDate.message = 'La fecha de entrada no puede ser anterior a hoy';
        valid = false;
      }
      else if (this.state.inDate.isAfter(moment().add(365, 'days'))) {
        formErrors.inDate.visible = true;
        formErrors.inDate.message = 'La fecha de entrada no puede ser posterior a un año de hoy';
        valid = false;
      }
      else if (this.state.outDate.isAfter(startMoment.add(30, 'days'))) {
        formErrors.outDate.visible = true;
        formErrors.outDate.message = 'La fecha de salida no puede ser posterior a 30 días de la entrada';
        valid = false;
      }
      else {
        formErrors.outDate.visible = false;
        formErrors.outDate.message = '';
        formErrors.inDate.visible = false;
        formErrors.inDate.message = '';
      }
    }

    if (this.state.rooms > this.state.adults) {
      formErrors.rooms.visible = true;
      formErrors.rooms.message = 'No puede haber más habitaciones que adultos';
      valid = false;
    }
    else {
      formErrors.rooms.visible = false;
      formErrors.rooms.message = '';
    }

    if ((Number(this.state.minors) + Number(this.state.adults)) > 8) {
      formErrors.adults.visible = true;
      formErrors.adults.message = 'No puede haber más de 8 personas en total';
      valid = false;
    }
    else {
      formErrors.adults.visible = false;
      formErrors.adults.message = '';
    }

    this.setState({
      formErrors: formErrors
    });
    return valid;
  }


  render() {
    return (
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
              <label>En que fecha?</label>
            </div>
            <div className="col-xs-6 reduced-right-padding">
              <DatePicker 
                dateFormat="DD/MM/YYYY" 
                onChange={this.handleInDate} 
                selected={this.state.inDate}
                minDate={moment()}
                maxDate={moment().add(365,'days')}
                placeholderText="Entrada" />
              <InputError
              visible={this.state.formErrors.inDate.visible}
              message={this.state.formErrors.inDate.message} />
            </div>
            <div className="col-xs-6 reduced-left-padding">
              <DatePicker 
                dateFormat="DD/MM/YYYY" 
                onChange={this.handleOutDate} 
                selected={this.state.outDate}
                minDate={this.state.minOutDate}
                maxDate={this.state.maxOutDate}
                placeholderText="Salida" />
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
              <InputError
              visible={this.state.formErrors.rooms.visible}
              message={this.state.formErrors.rooms.message} />
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
              <InputError
              visible={this.state.formErrors.adults.visible}
              message={this.state.formErrors.adults.message} />
            </div>
            <div className="col-xs-6 reduced-left-padding">
              <Select 
                containerClasses="col-xs-6 reduced-left-padding"
                min={0}
                max={7}
                label="Menores"
                onChange={this.handleMinors} />
              <InputError
              visible={this.state.formErrors.minors.visible}
              message={this.state.formErrors.minors.message} />
            </div>
          </div>
          <button className="btn btn-default" onClick={this.handleButtonClick}>Buscar</button>
        </form>
      </div>
        
    )
  }
}

export default Form;