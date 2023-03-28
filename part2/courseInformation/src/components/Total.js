function Total({total}){

  var totalValue = total.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises  
  }, 0)

  return (
    <div>
      {}
      <p>Number of exercises {totalValue}</p>
    </div>
  )
}

export default Total;