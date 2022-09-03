import React from "react";
import BillItemsForm from "./BillItemsForm.js"; // Import child component
import BillSplitResults from "./BillSplitResults"; // Import child component

export default class FormAndResultsParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInputTotalAmount: 217.80,
      userInputTipAmount: 15,
      userInputItemizedList: [ // List of item objects
        {
          itemName: 'item',
          itemPrice: '0',
          itemPeoplePaying: 'TBD'
        }

        // // Test data
        // {
        //   itemName: 'Shepherd',
        //   itemPrice: '16.00',
        //   itemPeoplePaying: 'Becky'
        // },
        // {
        //   itemName: 'Add chicken D',
        //   itemPrice: '6.00',
        //   itemPeoplePaying: 'Becky'
        // },
        // {
        //   itemName: 'Moules Frite',
        //   itemPrice: '23.00',
        //   itemPeoplePaying: 'Brandon'
        // },
        // {
        //   itemName: 'Lazzoni Salad',
        //   itemPrice: '23.00',
        //   itemPeoplePaying: 'Doug'
        // },
        // {
        //   itemName: 'Octopus D',
        //   itemPrice: '19.00',
        //   itemPeoplePaying: 'Alyssa, Rachel'
        // },
        // {
        //   itemName: 'Hummus Balzem',
        //   itemPrice: '8.00',
        //   itemPeoplePaying: 'Alyssa, Rachel'
        // },
        // {
        //   itemName: 'Prosciutto wraps',
        //   itemPrice: '19.00',
        //   itemPeoplePaying: 'Alyssa, Rachel'
        // },
        // {
        //   itemName: 'Wine',
        //   itemPrice: '55.00',
        //   itemPeoplePaying: 'Brandon, Becky, Doug, Rachel'
        // }

      ],
      submittedTotalAmount: 0,
      submittedTipAmount: 0,
      submittedItemizedList: []
    };

    this.handleFormChange = this.handleFormChange.bind(this); // Update value as user types
    this.handleTotalChange = this.handleTotalChange.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Update form field state on each key stroke
  // Arguments used to pick the proper form input field
  // https://stackoverflow.com/questions/29537299/how-can-i-update-state-item1-in-state-using-setstate
  handleFormChange(eventTargetName, eventTargetValue, itemIndex) {
    let itemizedListToChange = [...this.state.userInputItemizedList]; // Make a shallow copy of the items
    let itemToChange = {...itemizedListToChange[itemIndex]}; // Make a shallow copy of the item you want to mutate
    itemToChange[eventTargetName] = eventTargetValue;                 // Replace the property you're intested in
    itemizedListToChange[itemIndex] = itemToChange;                   // Put it back into the array - we *are* mutating the array here, but that's why we made a copy first
    this.setState({userInputItemizedList: itemizedListToChange})      // Set the state to our new copy
  }

  handleTotalChange(value) {
    this.setState({userInputTotalAmount: value})
  }

  // Update tip value as user types
  handleTipChange(value) {
    this.setState({userInputTipAmount: value})
  }

  addItem(event) {
    this.setState(prevState => ({
      userInputItemizedList: [ // copy and add new element
        ...prevState.userInputItemizedList,
        {
          itemName: 'Something',
          itemPrice: '0',
          itemPeoplePaying: 'TBD'
        }
      ]
    }))
  }

  handleSubmit(event) { // Set submitted data to be the current user inputs
    event.preventDefault(); // Do not redirect
    this.setState({submittedItemizedList: [...this.state.userInputItemizedList]})
    this.setState({submittedTipAmount: this.state.userInputTipAmount})
    this.setState({submittedTotalAmount: this.state.userInputTotalAmount})        
  }

  render() {
    return (
      <div>
        <BillItemsForm
          itemizedList={this.state.userInputItemizedList}
          onFormChange={this.handleFormChange}
          onTotalChange={this.handleTotalChange}
          onTipChange={this.handleTipChange}
          onAddItem={this.addItem}
          onSubmitForm={this.handleSubmit}
          tipAmount={this.state.userInputTipAmount}
          totalAmount={this.state.userInputTotalAmount} />
        <BillSplitResults
          submittedBill={this.state.submittedItemizedList}
          submittedTotal={this.state.submittedTotalAmount}
          submittedTip={this.state.submittedTipAmount} />
      </div>
    )
  }
}