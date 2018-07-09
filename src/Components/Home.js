import React, {Component} from 'react'
// import { NavLink } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    // moveSubjectName=(sub)=>{

    //   var tmp_sub=sub.name.replace(/ /g, "%20");
    //   const url = `https://jemusic.herokuapp.com/getUserByUserName/${tmp_sub}`;
    //   console.log(url);
  
    //   fetch(url).then((res) => {        
    //     return res.json();      
    //   }).then((data) => {        
    //     var self=this;        
    //     self.add(data.name);        
    //   })  
    // }
        return (
            <div className='book'>
              <div>{this.props.children}</div>
              {/* <NavLink to="/Subject" activeStyle={this.active} className="btn btn-primary followSub" >Follow</NavLink> */}
            </div>
        ); 
  }
}
export default Home