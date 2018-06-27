import React from 'react';
import { NavLink } from "react-router-dom";
const SearchList = ({ subjects, index }) => (

   <div>
   { subjects && subjects.map( (item, index) => 
       <div key={'container'+index}className="card" style={{width: 18 + 'rem'}}>
         <div className="card-body">
          <div key={'subject'+index} index={index} >
            <h1 className="card-title">{item.name}</h1>
            <p className="card-text">{item.date} * {item.hours}</p>
            <p className="card-text">{item.location}</p>
            <p className="card-text">{item.type}</p>
            <p className="card-text">{item.about}</p>
            <p className="card-text">{item.price} $</p>
            <p className="card-text">{item.requredSkills}</p>
            <p className="card-text">{item.participent}</p>
          </div>
        </div>
      </div>
    )}
  </div>


  );

export default SearchList;