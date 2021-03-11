import React from 'react';

const Header = ({ name }) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Total = ({ parts }) => {
  
    const sum = parts.reduce((tot, x) => tot + x.exercises, 0) 
  
    return(
      <p>Number of exercises {sum}</p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <li>
        {props.part.name} {props.part.exercises}
      </li>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <ul>
        {course.parts.map(part => 
          <Part key={part.id} part={part}/>)}
      </ul>
    )
  }
  
  const Course = ({course}) => {
    return (
      <li>
        <Header name={course.name}/>
        <Content course={course}/>
        <Total parts={course.parts}/>
      </li>
    )
  }
   export default Course