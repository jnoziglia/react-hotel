import React, { Component } from 'react';

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
              {this.formatRating(this.props.hotelInfo.rating)}
              <span className="hotel-name">{this.props.hotelInfo.name}</span>
            </div>
            <div className="hotel-subtitle">
              <span className="stars">
                {stars}
              </span>
              <span className="distance">{this.formatDistance(this.props.hotelInfo.distanceFromDowntown)} del centro</span>
            </div>
            <div className="reccomend">{this.props.hotelInfo.recomendations} lo recomendó</div>
            <div className="rooms-left">{this.formatRooms(this.props.hotelInfo.availableRooms)}</div>
            <div className="time-left">{this.formatTimeLeft(this.props.hotelInfo.availabilityTime)}</div>
          </div>
          <div className="col-sm-3 hotel-info-right">
            <div className="free-cancel">{this.formatCancelation(this.props.hotelInfo.freeCancelation)}</div>
            <div className="room-night">Habitación por noche</div>
            <div className="taxes">Impuestos y tasas no incluidos</div>
            <div className="old-price">{this.formatPrice(this.props.hotelInfo.oldPrice)}</div>
            <div className="price">{this.formatPrice(this.props.hotelInfo.price)}</div>
            <div className="details">
              <button className="btn btn-default">Ver detalle</button>
            </div>
            <div className="payment-type">¡Pagá al hotel o hasta en 50 cuotas!</div>
          </div>
        </div>
      </div>
    )
  }

  formatRating(rating) {
      var color;
      if (rating >= 9) {
        color = 'excellent';
      }
      else if (rating < 9 && rating >= 7) {
        color = 'very-good';
      }
      else if (rating < 7 && rating >= 4) {
        color = 'good';
      }
      else {
        color = 'bad';
      }
      return (<span className={'hotel-rating '+color}>{rating}</span>);
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
        return '¡Última oportunidad! ¡Queda una sola habitacion!';
      case null:
        break;
      default:
        return 'Últimas '+roomsLeft+' habitaciones';
    }
  }

  formatTimeLeft(availabilityTime) {
    if(availabilityTime) {
      var timeLeft = availabilityTime.split(':');
      return 'Restan '+timeLeft[0]+' horas '+timeLeft[1]+' segundos hasta agotar la disponibilidad';
    }
    else {
      return null;
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

export default Hotel;