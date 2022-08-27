import React from "react";

export default class BillItemsForm extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {

    let itemizedTable;           // Final element holdling the itemized data table
    let itemizedRows = [];       // Rows of item data generated
    let peoplePaying;            // Var to manipulate user input for people per item
    let numPeoplePaying;         // Count number of people per item
    let itemizedBillTotal = 0;   // Track pre tax/tip bill amount (itemized sum)
    let taxRate;                 // Tax rate calculated
    let peopleData = {};         // Object to store each person and their items
    let peopleRows = [];         // Rows of people data generated
    let peopleTable;             // Final element holding the people data table
    let personTotal;             // Holds the total per person in the loop
    let moneyOwedForItem;        // Amount one pay owes for a given item
    let tipForItem;              // Tip amount per item
    let taxForItem;              // Tax amount per item

    // ===================================
    // Present data table of itemized bill

    this.props.submittedBill.forEach((item) => itemizedBillTotal += parseFloat(item.itemPrice)) // Itemized total (pre tax/tip summed)
    taxRate = (this.props.submittedTotal - this.props.submittedTip) / itemizedBillTotal - 1     // Tax rate is pre tip amount over itemized total minus 1

    // Loop over items to create rows of data
    this.props.submittedBill.forEach((item, index) => {
      peoplePaying = item.itemPeoplePaying.split(',').map(person => person.trim()) // Split comma separated people into an array and trim white spaces
      numPeoplePaying = peoplePaying.length
      
      // Loop over the people and add the item to them (used later for per person table)
      peoplePaying.forEach((person) => {
        if (peopleData.hasOwnProperty(person)) {
          peopleData[person].push(item)
        } else {
          peopleData[person] = [item]
        }
      }) 

      peoplePaying = peoplePaying.join(', ')            // Join back as consistent string
      itemizedRows.push(                                // Add table row elements
        <tr key={index}>
          <td>{item.itemName}</td>
          <td>$ {item.itemPrice}</td>
          <td>$ {(item.itemPrice * taxRate).toFixed(2)}</td>
          <td style={{'textAlign':'center'}}>{numPeoplePaying}</td>
          <td>{peoplePaying}</td>
        </tr>
      )
    })

    // If the bill has been submitted, add tex, tip, and total rows
    if (this.props.submittedBill.length > 0) {                  // Add tax row (calculte based on user inputs)
      itemizedRows.push(
        <tr key='tax'>
          <td>Tax</td>
          <td></td>
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

    // ============================================
    // Present data table of amount owed per person

    for (const [person, itemsArray] of Object.entries(peopleData)) {
      personTotal = 0
      for (let index = 0; index < itemsArray.length; index++) { // forEach caused lint error for unsafe variable use, something about anonymous (arrow) function and garbage collection issues
        let item = itemsArray[index]
        peoplePaying = item.itemPeoplePaying.split(',').map(splitWithPerson => splitWithPerson.trim()) // Split comma separated people into an array and trim white spaces
        numPeoplePaying = peoplePaying.length
        peoplePaying = peoplePaying.join(', ')            // Join back as consistent string
        tipForItem = item.itemPrice / itemizedBillTotal * this.props.submittedTip
        taxForItem = item.itemPrice * (1 + taxRate)
        moneyOwedForItem = (tipForItem + taxForItem) / numPeoplePaying
        personTotal += moneyOwedForItem

        peopleRows.push(                                // Add table row elements
          <tr key={index}>
            <td>{person}</td>
            <td>{item.itemName}</td>
            <td>$ {moneyOwedForItem.toFixed(2)}</td>
            <td>$ {item.itemPrice}</td>
            <td>$ {(item.itemPrice * taxRate).toFixed(2)}</td>
            <td>$ {tipForItem.toFixed(2)}</td>
            <td style={{'textAlign':'center'}}>{numPeoplePaying}</td>
            <td>{peoplePaying}</td>
          </tr>
        )
      }
      // )
      peopleRows.push(                                // Add person's total
          <tr key={'tbd'}>
            <td><b>{person}</b></td>
            <td><b>Total Due</b></td>
            <td><b>$ {personTotal.toFixed(2)}</b></td>
          </tr>,
          <br></br>
        )

    }

    // ================
    // Table structures
    
    // Create the table with heading and rows of data
    itemizedTable = (
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Tax (%{taxRate.toFixed(4)})</th>
            <th>Ways Split</th>
            <th>People</th>
          </tr>
        </thead>
        <tbody>
          {itemizedRows}
        </tbody>
      </table>
    )

    // Create the table with heading and rows of data
    peopleTable = (
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th>Item</th>
            <th>Amount Owed</th>
            <th>Item Price</th>
            <th>Tax (%{taxRate.toFixed(4)})</th>
            <th>Tip</th>
            <th>Ways Split</th>
            <th>Split With</th>
          </tr>
        </thead>
        <tbody>
          {peopleRows}
        </tbody>
      </table>
    )

    return (
      <div>
        <h1>Bill Split Results</h1>
        {itemizedTable}
        <br></br>
        {peopleTable}
      </div>
    )
  }
}