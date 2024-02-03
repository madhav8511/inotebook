import React from 'react'


export default function About() {
  
  return (
    <>
    <div className='container'>
      <h1>Basic Features in I-NoteBook</h1>
    </div>
    <div className='d-flex flex-nowrap my-5 justify-content-around'>
      <div className="card" style={{ height: 100, width: 300 }}>
        <img src="https://previews.123rf.com/images/stodolskaya/stodolskaya1511/stodolskaya151100027/49219342-user-login-or-access-authentication-icon.jpg" style={{ height: 200, width: 300 }} className="card-img-top" alt="..."/>
        <div className="card-body">
          <p className="card-text">Users would need to sign in or log in to the notebook application using a username and password. This helps ensure the security and privacy of their notes.</p>
        </div>   
      </div>

      <div className="card mx-2" style={{ height: 100, width: 300 }}>
        <img src="https://m.media-amazon.com/images/I/51W2XjMzVpL._AC_UF1000,1000_QL80_.jpg" style={{ height: 200, width: 300 }} className="card-img-top" alt="..."/>
        <div className="card-body">
          <p className="card-text">Once authenticated, users can create new notes. The application would likely provide a user-friendly interface for typing, formatting, and organizing text.</p>
        </div>   
      </div>

      <div className="card mx-2" style={{ height: 100, width: 300 }}>
        <img src="https://play-lh.googleusercontent.com/vSNQds6F5roxdN4-a16JnQ9dWQVSZZ8OH4-iMAcNLaFQd3ItZWU8rOPOql4Ew5Hh1esX" style={{ height: 200, width: 300 }} className="card-img-top" alt="..."/>
        <div className="card-body">
          <p className="card-text">Once authenticated, users can create new notes. The application would likely provide a user-friendly interface for typing, formatting, and organizing text.</p>
        </div>   
      </div>

      <div className="card mx-2" style={{ height: 100, width: 300 }}>
        <img src="https://c8.alamy.com/comp/2GBCM5K/delete-text-on-red-brown-ribbon-badge-stamp-2GBCM5K.jpg" style={{ height: 200, width: 300 }} className="card-img-top" alt="..."/>
        <div className="card-body">
          <p className="card-text">OUsers should have the ability to delete notes they no longer need. This action might involve a confirmation prompt to prevent accidental deletions</p>
        </div>   
      </div>
    </div>
    </>
  )
}
