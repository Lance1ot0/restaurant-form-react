import React from 'react'

export default function Questions(props) {
  return (
    <>
        <p>{props.content.question}</p>
        {props.content && props.content.answer.map((answer) => (
        <input type="button" value={answer} onClick={props.func}/>
        ))}
    </>
  )
}
