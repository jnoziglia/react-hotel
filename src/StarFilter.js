import React, { Component } from 'react';

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
    // Update checkboxes checked values
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
    // Generate Filters
    for (var i = 5; i >= 1; i--) {
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
            <span className="quantity">{this.props.starsQuantity[i]}</span>
          </label>
        </li>
      ));
    }

    return (
      <ul className="list-group">
        <li className="list-group-item">
          <label>
            <input type="checkbox" value="all" defaultChecked onClick={this.handleCheckboxClick} />
            <span>
              Todas las estrellas
            </span>
            <span className="quantity-all">{this.props.starsQuantity['all']}</span>
          </label>
        </li>
        {starsArray}
      </ul>
    )
  }
}

export default StarFilter;