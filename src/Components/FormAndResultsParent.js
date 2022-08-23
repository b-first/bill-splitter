import React from "react";
import BillItemsForm from "./BillItemsForm.js"; // Import child component

export default class FormAndResultsParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemizedList: [ // List of item objects
        {
          itemName: 'item',
          itemPrice: '0',
          itemPeoplePaying: 'TBD'
        }
      ]
    };

    this.handleFormChange = this.handleFormChange.bind(this); // Update value as user types
    this.addItem = this.addItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Update form field state on each key stroke
  // Arguments used to pick the proper form input field
  // https://stackoverflow.com/questions/29537299/how-can-i-update-state-item1-in-state-using-setstate
  handleFormChange(eventTargetName, eventTargetValue, itemIndex) {
    let itemizedListToChange = [...this.state.itemizedList];  // Make a shallow copy of the items
    let itemToChange = {...itemizedListToChange[itemIndex]};  // Make a shallow copy of the item you want to mutate
    itemToChange[eventTargetName] = eventTargetValue;         // Replace the property you're intested in
    itemizedListToChange[itemIndex] = itemToChange;           // Put it back into the array - we *are* mutating the array here, but that's why we made a copy first
    this.setState({itemizedList: itemizedListToChange})       // Set the state to our new copy
    
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
    return (
      <BillItemsForm
        itemizedList={this.state.itemizedList}
        onFormChange={this.handleFormChange}
        onAddItem={this.addItem}
        onSubmitForm={this.handleSubmit}/>
    )
  }
}