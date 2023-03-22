import Button from "./components/Buttons";
import {useState} from 'react'
import Statistics from "./components/Statistics";

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  function handleClickGood () {
    setGood(good + 1)
    setTotal(total + 1)
  }
  
  function handleClickNeutral () {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }
  
  function handleClickBad () {
    setBad(bad + 1)
    setTotal(total + 1)
  }
  if (total) {
    return (
      <div className="App">
        <h2>give feedback</h2>
        <div>
          <Button handleClick={handleClickGood} text="good" />
          <Button handleClick={handleClickNeutral} text="neutral" />
          <Button handleClick={handleClickBad} text="bad" />
        </div>
  
        <h2>statistics</h2>
  
        <Statistics textContent="good" statisticsValue={good} />
        <Statistics textContent="neutral" statisticsValue={neutral} />
        <Statistics textContent="bad" statisticsValue={bad} />
        <Statistics textContent="all" statisticsValue={total} />
  
        <p>avarage {(good + bad * (-1)) / total}</p>
        <p>positive {(good*100) / total} %</p>
      </div>
    );
  }

  return (
    <div className="App">
        <h2>give feedback</h2>
        <div>
          <Button handleClick={handleClickGood} text="good" />
          <Button handleClick={handleClickNeutral} text="neutral" />
          <Button handleClick={handleClickBad} text="bad" />
        </div>
  
        <h2>statistics</h2>
        <p>No feedback given</p>
    </div>
  );
}

export default App;
