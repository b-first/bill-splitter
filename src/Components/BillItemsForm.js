import React from "react";
import BillItemFormRow from "./BillItemFormRow.js" // Import child component

export default class BillItemsForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleFormChange = this.handleFormChange.bind(this); // Update value as user types
    this.addItem = this.addItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lift up data to Update form field state on each key stroke
  // Arguments used to pick the proper form input field
  // https://stackoverflow.com/questions/29537299/how-can-i-update-state-item1-in-state-using-setstate
  handleFormChange(eventTargetName, eventTargetValue, itemIndex) {
    this.props.onFormChange(eventTargetName, eventTargetValue, itemIndex) // Lift up to parent
    // console.log(eventTargetName, eventTargetValue) // Checking what's passed in
    // console.log(this.state.itemizedList[0][eventTargetName]) // Accesses the specific object field
  }

  addItem(event) {
    this.props.onAddItem(event) // Lift up to parent
  }

  handleSubmit(event) {
    this.props.onSubmitForm(event) // Lift up to parent
  }

  render() {
    const rows = []; // List to hold all the components
    this.props.itemizedList.forEach((item, index) => 
      rows.push( // Add components to the list
        <BillItemFormRow
          itemName={item.itemName}
          itemPrice={item.itemPrice}
          itemPeoplePaying={item.itemPeoplePaying}
          onInputChange={this.handleFormChange} // Child lifts up state using this
          itemIndex={index} />
      )
    )
    return (
      <form onSubmit={this.handleSubmit}>
        {rows} {/* Render all components in this list */}
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
