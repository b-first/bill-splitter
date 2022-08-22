import React from "react";
import BillItemFormRow from "./BillItemFormRow.js"

export default class BillItemsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemizedList: [
        {
          itemName: 'item',
          itemPrice: '0',
          itemPeoplePaying: 'TBD'
        }
      ]
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Update form field state on each key stroke
  handleFormChange(eventTargetName, eventTargetValue) {
    // https://stackoverflow.com/questions/29537299/how-can-i-update-state-item1-in-state-using-setstate
    let itemizedListToChange = [...this.state.itemizedList]; // Make a shallow copy of the items
    let itemToChange = {...itemizedListToChange[0]}; // Make a shallow copy of the item you want to mutate
    itemToChange[eventTargetName] = eventTargetValue; // Replace the property you're intested in
    itemizedListToChange[0] = itemToChange; // Put it back into our array - we *are* mutating the array here, but that's why we made a copy first
    this.setState({itemizedList: itemizedListToChange}) // Set the state to our new copy
    
    // console.log(eventTargetName, eventTargetValue) // Checking what's passed in
    // console.log(this.state.itemizedList[0][eventTargetName]) // Accesses the specific object field
  }

  addItem(event) {
    this.setState(prevState => ({
      itemizedList: [ // copy and add new element
        ...prevState.itemizedList,
        {
          itemName: 'Something',
          itemPrice: '0',
          itemPeoplePaying: 'TBD'
        }
      ]
    }))
  }

  handleSubmit(event) {
    alert('submitted');
    event.preventDefault();
  }

  render() {
    const rows = [];
    this.state.itemizedList.forEach((item, index) => 
      rows.push(
        <BillItemFormRow
          itemName={item.itemName}
          itemPrice={item.itemPrice}
          itemPeoplePaying={item.itemPeoplePaying}
          onInputChange={this.handleFormChange}
          itemIndex={index} />
      )
    )
    return (
      <form onSubmit={this.handleSubmit}>
        {rows}
        <br></br><br></br>
        <button type="button" onClick={this.addItem}>
          Add Item
        </button>
        <br></br><br></br>
        <input type='submit' value='Submit the Form' />
      </form>
    )
  }
}

/*
BillItemsForm:
  state = {
    itemizedList = [
      {itemName: <string>, price: <float>, peoplePaying: [person1, person2]},
    ]
  }
BillItemFormRow
BillItemName
BillItemPrice
BillItemPeoplePaying

Create one BillItem
Lift up values from label/input components to the form
  NOT SURE HOW UPDATING THIS WORKS
  e.g. if user changes a line item, how does it know which element in the state array to change

Button to add a new item
  Add new item to itemizedList state
    Give key based on numItems state
  Increment numItems state

Lifting state up - https://reactjs.org/docs/lifting-state-up.html
Generating new line - https://stackoverflow.com/questions/53825143/the-proper-way-to-add-elements-in-react
*/