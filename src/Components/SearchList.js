import React from 'react';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
//TODO:check if the user is allready follows this subject
//TODO: fix background of subject

const SearchList = ({ subjects, index }) => (

   <div>
   { subjects && subjects.map( (item, index) => 
    
       <div key={'container'+index}  
       className="card cards padding5" style={{width: `18rem`,borderRadius: `20px`,background: `linear-gradient(black, #808080)` }}>

         <div className="card-body">
          <div key={'subject'+index} index={index} >
            <h1 className="card-title">{item.name}</h1>
            <p className="card-text">{item.date} ● {item.hours}</p>
            <p className="card-text">{item.location}</p>
            <p className="card-text">{item.type}</p>
            <p className="card-text">{item.price} ₪</p>
            <p className="card-text">{item.requredSkills}</p>
            <p className="card-text">{item.participent}</p>
          </div>
        </div>

      <a href="/Subject" className="btn btn-primary followSub">Follow</a>
      </div>
    )}
  </div>


  );

export default SearchList;