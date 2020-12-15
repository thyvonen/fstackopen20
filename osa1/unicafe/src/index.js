import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const handleGood = () => {
    setGood(good +1)
    setAll(all +1)
  }

  const handleNeutral = () => {
    setNeutral(neutral +1)
    setAll(all +1)
  }

  const handleBad = () => {
    setBad(bad +1)
    setAll(all +1)
  }

  return (
    <div>
      <div>
        <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text='Good'/>
      <Button handleClick={handleNeutral} text='Neutral'/>
      <Button handleClick={handleBad} text='Bad'/>
      </div>
      <div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} all={all}/>
      </div>
    </div>
  )
}

const Statistics = ({good, neutral, bad, all}) => {

  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
        <StatisticLine text='Good: ' value={good}/>
        <StatisticLine text='Neutral: ' value={neutral}/>
        <StatisticLine text='Bad: ' value={bad}/>
        <StatisticLine text='All: ' value={all}/>
        <StatisticLine text='Average: ' value={good - bad / all}/>
        <StatisticLine text='Positive: ' value={good / all * 100 + '%'} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)