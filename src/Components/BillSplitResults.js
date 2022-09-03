import React from "react";

export default class BillSplitResults extends React.Component {
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

    this.props.submittedBill.forEach((item) => itemizedBillTotal += parseFloat(item.itemPrice)) // Itemized total (pre tax/tip summed)
    taxRate = (this.props.submittedTotal - this.props.submittedTip) / itemizedBillTotal - 1     // Tax rate is pre tip amount over itemized total minus 1

    // ========================
    // Itemized Bill Data Table

    // Loop over items
    this.props.submittedBill.forEach((item, index) => {
      peoplePaying = item.itemPeoplePaying.split(',').map(person => person.trim()) // Split comma separated people into an array and trim white spaces
      numPeoplePaying = peoplePaying.length
      
      // Loop over the people and record items associated (for people data table later)
      peoplePaying.forEach((person) => {
        if (peopleData.hasOwnProperty(person)) { // If person already found, add a new item to them
          peopleData[person].push(item)
        } else {
          peopleData[person] = [item]            // For new people, add the first item
        }
      }) 

      peoplePaying = peoplePaying.join(', ')            // Join back as consistent string
      itemizedRows.push(                                // Add table row elements
        <tr key={'itemizedRows'+index}>
          <td key={'itemizedRowDataName'+index}>{item.itemName}</td>
          <td key={'itemizedRowDataPrice'+index}>$ {item.itemPrice}</td>
          <td key={'itemizedRowDataTax'+index}>$ {(item.itemPrice * taxRate).toFixed(2)}</td>
          <td key={'itemizedRowDataNumPeoplePaying'+index}style={{'textAlign':'center'}}>{numPeoplePaying}</td>
          <td key={'itemizedRowDataPeoplePaying'+index}>{peoplePaying}</td>
        </tr>
      )
    })

    // ================
    // People data table

    for (const [person, itemsArray] of Object.entries(peopleData)) {
      personTotal = 0
      for (let index = 0; index < itemsArray.length; index++) { // forEach caused lint error for unsafe variable use, something about anonymous (arrow) function and garbage collection issues
        let item = itemsArray[index]
        peoplePaying = item.itemPeoplePaying.split(',').map(splitWithPerson => splitWithPerson.trim()) // Split comma separated people into an array and trim white spaces
        numPeoplePaying = peoplePaying.length
        peoplePaying = peoplePaying.join(', ')          // Join back as consistent string
        tipForItem = item.itemPrice / itemizedBillTotal * this.props.submittedTip
        taxForItem = item.itemPrice * (1 + taxRate)
        moneyOwedForItem = (tipForItem + taxForItem) / numPeoplePaying
        personTotal += moneyOwedForItem

        peopleRows.push(                                // Add table row elements
          <tr key={'peopleRow'+person+index}>
            <td key={'peopleRowDataPersonName'+index}>{person}</td>
            <td key={'peopleRowDataItemName'+index}>{item.itemName}</td>
            <td key={'peopleRowDataMoneyDueForItem'+index}>$ {moneyOwedForItem.toFixed(2)}</td>
            <td key={'peopleRowDataItemPrice'+index}>$ {item.itemPrice}</td>
            <td key={'peopleRowDataItemTax'+index}>$ {(item.itemPrice * taxRate).toFixed(2)}</td>
            <td key={'peopleRowDataItemTip'+index}>$ {tipForItem.toFixed(2)}</td>
            <td key={'peopleRowDataItemNumPeoplePaying'+index} style={{'textAlign':'center'}}>{numPeoplePaying}</td>
            <td key={'peopleRowDataItemPeoplePaying'+index}>{peoplePaying}</td>
          </tr>
        )
      }

      peopleRows.push(                                 // Add person's total row
        <tr key={'peopleRowTotal'+person}>
          <td key={'peopleRowDataTotalPersonName'+person}><b>{person}</b></td>
          <td key={'peopleRowDataTotalDueText'+person}><b>Total Due</b></td>
          <td key={'peopleRowDataTotalDueAmount'+person}><b>$ {personTotal.toFixed(2)}</b></td>
        </tr>,
        <tr key={'blankRow'+person}>
          <td key={'blankRowDta'+person}><br></br></td>
        </tr> // Blank row for spacing
      )
    }

    // ===============================
    // Table structure - Itemized Bill

    // If the bill has been submitted (don't render by default), add tax, tip, and total rows
    if (this.props.submittedBill.length > 0) { // Add tax row (calculte based on user inputs)
      itemizedRows.push(
        <tr key='itemizedRowsTaxRow'>
          <td key='itemizedRowsTaxRowDataText'>Tax</td>
          <td key='itemizedRowsTaxRowDataBlank'></td>
          <td key='itemizedRowsTaxRowDataAmount'>
            $ {(this.props.submittedTotal - this.props.submittedTip - itemizedBillTotal).toFixed(2)} {/* Tax is total minus tip minus items' cost */}
          </td>
        </tr>
      )
      itemizedRows.push(                                        // Add tip row
        <tr key='itemizedRowsTipRow'>
          <td key='itemizedRowsTipRowDataText'>Tip</td>
          <td key='itemizedRowsTipRowDataAmount'>$ {this.props.submittedTip}</td>
        </tr>
      )
      itemizedRows.push(                                        // Add total as last row
        <tr key='itemizedRowsTotalRow'>
          <td key='itemizedRowsTotalRowDataText'>Total</td>
          <td key='itemizedRowsTotalRowDataAmount'>$ {this.props.submittedTotal}</td>
        </tr>
      )
    }

    // Create the table with heading and rows of data
    itemizedTable = (
      <table>
        <thead>
          <tr key={'itemizedRowsHeaderRow'}>
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
    
    // ==============================
    // Table Structure - People Table
    // Create the table with heading and rows of data
    peopleTable = (
      <table>
        <thead>
          <tr key={'peopleRowsHeaderRow'}>
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

    // ================
    // Return

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