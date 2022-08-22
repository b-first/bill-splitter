import React from "react";

// Lifts item attributes up to the form
export default class BillItemFormRow extends React.Component {
  constructor(props) {
    super(props);
    
    // No state, lifting up
    // this.state = {
    //   itemName: '',
    //   itemPrice: '',
    //   itemPeoplePaying: ''
    // };

    this.handleChange = this.handleChange.bind(this);
  }

  // Update form field state on each key stroke
  handleChange(event) {
    this.props.onInputChange(event.target.name, event.target.value)
    // if (event.target.name === 'itemName') {
    //   this.setState({itemName: event.target.value});
    // } else if (event.target.name === 'itemPrice') {
    //   this.setState({itemPrice: event.target.value});
    // } else if (event.target.name === 'itemPeoplePaying') {
    //   this.setState({itemPeoplePaying: event.target.value});
    // }
  }

  render() {
    return (
      <div name={this.props.itemIndex} key={this.props.itemIndex}>
        <label>
          Item: 
          <input 
            name='itemName'
            type='text'
            value={this.props.itemName}
            onChange={this.handleChange} />
        </label>
        <label>
          Price:
          <input
            name='itemPrice'
            type='text'
            value={this.props.itemPrice}
            onChange={this.handleChange} />
        </label>
        <label>
          People Paying:
          <input
            name='itemPeoplePaying'
            type='text'
            value={this.props.itemPeoplePaying}
            onChange={this.handleChange} />
        </label>
      </div>

    )
  }
}

/*
Could do one handler per input, or just use the conditional on an assigned name

  handleNameChange(event) {
    this.setState({itemName: event.target.value});
  }

  handlePriceChange(event) {
    this.setState({itemPrice: event.target.value});
  }

  handlePeopleChange(event) {
    this.setState({itemPeoplePaying: event.target.value})
    console.log(event.target)
  }
*/