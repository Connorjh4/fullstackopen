import React, {useState} from 'react'

const Button = ( {handleClick, text} ) => (
  <button onClick={handleClick}>{text}</button>
)

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, 
    neutral: 0, 
    bad: 0,
    all: 0,
    total: 0,
  })

  const handleGood = () => {
    setClicks({ ...clicks, 
        good: clicks.good + 1
      , all: clicks.all + 1
      , total: clicks.total + 1
    })
    
  }

  const handleNeutral = () => {
    setClicks({ ...clicks, 
        neutral: clicks.neutral + 1
      , all: clicks.all + 1
    })
  }

  const handleBad = () => {
    setClicks({ ...clicks, 
        bad: clicks.bad + 1
      , all: clicks.all + 1
      , total: clicks.total -1
    })
  }

  const StatisticLine = ({text, value}) => {
    return(
      <tr>
        <td>{text}</td>
        <th>{value}</th>
      </tr>
    )
  }
  
  const Statistics = ({clicks}) => {
    const average = (clicks.total/clicks.all).toFixed(2)
    const positive = ((clicks.good/clicks.all)*100).toFixed(2)
    if(clicks.all === 0){
      return(
        <div>No feedback given</div>
      )
    }
      return(
        <div>
          <table>
          <tbody>
          <StatisticLine text='good' value={clicks.good} />
          <StatisticLine text='neutral' value={clicks.neutral} />
          <StatisticLine text='bad' value={clicks.bad} />
          <StatisticLine text='all' value={clicks.all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={`${positive}%`} />
          </tbody>
          </table>
        </div>
      )
    }


  return (
    <div>
    <h1>give feedback</h1>
    <Button handleClick={handleGood} text='good' />
    <Button handleClick={handleNeutral} text='neutral' />
    <Button handleClick={handleBad} text='bad' />
    <h1>statistics</h1>
    <Statistics clicks={clicks} />
    </div>
  )
}

export default App
