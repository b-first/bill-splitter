import React from "react";

// Lifts item attributes up to the form
export default class BillItemFormRow extends React.Component {
  constructor(props) {
    super(props);
    
    // No state, lifting up

    this.handleChange = this.handleChange.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);
    this.handleTotalChange = this.handleTotalChange.bind(this);
  }

  // Field value is in parent state
  handleChange(event) {
    this.props.onInputChange(event.target.name, event.target.value, this.props.itemIndex) // Lift up with this callback
  }
  
  handleTotalChange(event) {
    this.props.onTotalChange(event.target.value)
  }

  handleTipChange(event) {
    this.props.onTipChange(event.target.value)
  }

  render() {
    let row;

    // Total row
    if (this.props.isTotal) {
      row = (
        <div key={"total"}>
          <label>
            Total Bill:
            <input
              name="total"
              type="text"
              value={this.props.totalAmount}
              onChange={this.handleTotalChange}/>
          </label>
        </div>
      )
    }

    // Tip row
    else if (this.props.isTip) {
      row = (
        <div key={"tip"}> {/* The key should be "tip" */}
          <label>
            Tip:
            <input
              name="tip"
              type="text"
              value={this.props.tipAmount}
              onChange={this.handleTipChange}/>
          </label>
        </div>
      )
    
    // Non-tip rows
    } else {
      row = (
        <div name={this.props.itemIndex} key={this.props.itemIndex}> {/* Need a key for list items, using index b/c no other reasonable ID available */}
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

    return row
  }
}

/*
Could do one handler per input
  if (event.target.name === 'itemName') {
    this.setState({itemName: event.target.value});
  } else if (event.target.name === 'itemPrice') {
    this.setState({itemPrice: event.target.value});
  } else if (event.target.name === 'itemPeoplePaying') {
    this.setState({itemPeoplePaying: event.target.value});
  }

Or just use the conditional on an assigned name
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