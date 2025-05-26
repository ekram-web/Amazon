import React from 'react'
import numeral from 'numeral';

const CurrencyFormat = ({amount})=>{
    
    const formattedAmount = numeral(amount).format("$0,0.00")
    // The above line formats the amount to a currency format, e.g., $1,234.56
    // The format string "$0,0.00" specifies that the number should be formatted as a currency with two decimal places.
    return <div>{formattedAmount}
    
    </div>
}

export default CurrencyFormat
