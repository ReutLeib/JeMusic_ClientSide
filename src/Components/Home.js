import React, {Component} from 'react'
import { NavLink } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.flagHeader = false 
    // this.bla=this.bla.bind(this);
    // this.bla()
  }

  active = {
      backgroundColor: "#212F3D",
      color: "white",
      fontWeight: "bold"
  };

  // bla(){
  //   return(    
  //     <div>
  //       <p>bla bla</p>
  //     </div>
  //   )
  // }

  render() {
        return (
            <div className='book'>
              <div>{this.props.children}</div>
              <NavLink to="/Subject" activeStyle={this.active} className="btn btn-primary followSub">Follow</NavLink>
            </div>
        ); 
  }
}
export default Home