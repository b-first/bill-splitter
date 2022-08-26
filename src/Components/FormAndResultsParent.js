import React from "react";
import BillItemsForm from "./BillItemsForm.js"; // Import child component
import BillSplitResults from "./BillSplitResults"; // Import child component

export default class FormAndResultsParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tipAmount: 0,
      itemizedList: [ // List of item objects
        {
          itemName: 'item',
          itemPrice: '0',
          itemPeoplePaying: 'TBD'
        }
      ],
      submittedBill: []
    };

    this.handleFormChange = this.handleFormChange.bind(this); // Update value as user types
    this.handleTipChange = this.handleTipChange.bind(this);
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
  }

  // Update tip value as user types
  handleTipChange(value) {
    this.setState({tipAmount: value})
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
    event.preventDefault(); // Do not redirect
    alert('submitted');
    this.setState({submittedBill: [...this.state.itemizedList]}) // Set state object to be the itemized list at time of submission
  }

  render() {
    return (
      <div>
        <BillItemsForm
          itemizedList={this.state.itemizedList}
          onFormChange={this.handleFormChange}
          onTipChange={this.handleTipChange}
          onAddItem={this.addItem}
          onSubmitForm={this.handleSubmit}
          tipAmount={this.state.tipAmount} />
        <BillSplitResults
          submittedBill={this.state.submittedBill}/>
      </div>
    )
  }
}