import React from 'react'
import Parts from './parts'

const Courses = ({ course }) => { 
  

  return (
    <div>
      <h2 key={course.id} >{course.name}</h2>
      <Parts 
        key={course.parts.id} 
        parts={course.parts} 
      />
    </div>

  )
}

export default Courses