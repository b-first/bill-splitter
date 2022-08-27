import React from "react";

export default class BillItemsForm extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    // ===================================
    // Present data table of itemized bill

    let itemizedTable;         // Final element holdling the data table
    let itemizedRows = [];     // Rows of data generated
    let peoplePaying;          // Var to manipulate user input for people per item
    let numPeoplePaying;       // Count number of people per item
    let itemizedBillTotal = 0; // Track total bill amount

    // Loop over items to create rows of data
    this.props.submittedBill.forEach((item, index) => {
      peoplePaying = item.itemPeoplePaying.split(',').map(person => person.trim()) // Split comma separated people into an array and trim white spaces
      numPeoplePaying = peoplePaying.length
      peoplePaying = peoplePaying.join(', ')            // Join back as consistent string
      itemizedRows.push(                                // Add table row elements
        <tr key={index}>
          <td>{item.itemName}</td>
          <td>$ {item.itemPrice}</td>
          <td style={{'textAlign':'center'}}>{numPeoplePaying}</td>
          <td>{peoplePaying}</td>
        </tr>
      )
      itemizedBillTotal += parseFloat(item.itemPrice)
    })

    // If the bill has been submitted, add tex, tip, and total rows
    if (this.props.submittedBill.length > 0) {                  // Add tax row
      itemizedRows.push(
        <tr key='tax'>
          <td>Tax</td>
          <td>
            $ {this.props.submittedTotal - this.props.submittedTip - itemizedBillTotal} {/* Tax is total minus tip minus items' cost */}
          </td>
        </tr>
      )
      itemizedRows.push(                                        // Add tip row
        <tr key='tip'>
          <td>Tip</td>
          <td>$ {this.props.submittedTip}</td>
        </tr>
      )
      itemizedRows.push(                                        // Add total as last row
        <tr key='total'>
          <td>Total</td>
          <td>$ {this.props.submittedTotal}</td>
        </tr>
      )
    }

    // Create the table with heading and rows of data
    itemizedTable = (
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Ways Split</th>
            <th>People</th>
          </tr>
        </thead>
        <tbody>
          {itemizedRows}
        </tbody>
      </table>
    )

    // ====================
    // Bill splitting logic
    

    

    return (
      <div>
        <h1>Bill Split Results</h1>
        {/* {itemizedItemsRows} */}
        {itemizedTable}
      </div>
    )
  }
}