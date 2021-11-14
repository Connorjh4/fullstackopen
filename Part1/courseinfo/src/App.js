import React from 'react'

const Header = ({course}) => {
  return(
    <h1>{course.name}</h1>
  )
}

const Content = ({parts}) => {
  return(
    parts.map((part, i) => {
      return(
        <Part part={part} key={i}/>
      ) 
    })
  )
}

const Part = ({part}) => {
  return(
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((prev, current) => {
    return prev + +current.exercises},0)

  return(
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header 
        course={course} 
      />
      <Content 
        parts={course.parts} 
      />
      <Total 
        parts={course.parts} 
      />
    </div>
  )
}

export default App