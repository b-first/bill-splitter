import React from "react";

export default class BillItemsForm extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    const itemizedItemsRows = [];
    let peoplePaying = '';
    this.props.submittedBill.forEach((item, index) => {
      peoplePaying = item.itemPeoplePaying.split(',') // split comma separated people into an array
      peoplePaying.forEach((person, personIndex) => peoplePaying[personIndex] = person.trim()) // Trim white space between people
      itemizedItemsRows.push(
        <p key={index}>
          {item.itemName} -- ${item.itemPrice} -- {peoplePaying.toString()}
        </p>
      )
    })

    // Bill splitting logic

    

    return (
      <div>
        <h1>Bill Split Results</h1>
        {itemizedItemsRows}
      </div>
    )
  }
}