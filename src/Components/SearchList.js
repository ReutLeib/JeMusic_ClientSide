import React from 'react';
//TODO:check if the user is allready follows this subject
//TODO: fix background of subject

const SearchList = ({ subjects, index }) => (

   <div>
   { subjects && subjects.map( (item, index) => 
    
       <div key={'container'+index}  
       className="card cards" style={{width: `18rem`, backgroundImage: `url(../images/${item.background})`, backgroundRepeat: 'no-repeat' }}>

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

      <a href="/Subject" className="btn btn-primary followSub">Follow</a>
      </div>
    )}
  </div>


  );

export default SearchList;