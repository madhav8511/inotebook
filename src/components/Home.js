import React from 'react'
import Notes from './Notes';


export default function Home(props) {
  const {show_alert} = props;
  return (
    <div className='container'>
      <Notes show_alert={show_alert}/>
    </div>
  )
}
