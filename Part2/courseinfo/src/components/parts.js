import React from 'react'

const Parts = ({parts}) => {
  const total = parts.reduce((prev, current) => {
    return prev + +current.exercises},0)
  return (
    <div>
      {parts.map( part =>
        <div key={part.id}>
          <p>
            {part.name} {part.exercises}
          </p>
        </div>
      )}
      <b>total of {total} exercises</b>
    </div>
  )
}

export default Parts