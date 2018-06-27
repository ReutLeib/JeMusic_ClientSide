
import React from 'react';

// add the card of book
const BookRankList = ({ books, index }) => (
  <div>
   { books && books.map( (item, index) => 
       <div key={'container'+index}className="card" style={{width: 18 + 'rem'}}>
         <div className="card-body">
          <div key={'book'+index} index={index} >
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">{item.author.nationality}</p>
              <p className="card-text">{item.author.age}</p>
              <p className="card-text">{item.rank}</p>
          </div>
        </div>
      </div>
    )}
  </div>
    
  );

export default BookRankList;