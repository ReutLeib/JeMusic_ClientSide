import React, {Component} from 'react'
import { NavLink } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.flagHeader = false
    this.cards=this.cards.bind(this);

  }
  active = {
      backgroundColor: "#212F3D",
      color: "white",
      fontWeight: "bold"
  };
  
  cards(event) {
      // if(this.flagHeader === false){
      //   this.flagHeader = true
      //   return (
      //     <div className='stam'>
      //        <p className="stam">
      //         dsflksjdf
      //        </p>
      //       </div>
      //   ); 
      // }
      // else{
        return (
            <div className='book'>
              <div>{this.props.children}</div>
              <NavLink to="/Subject" activeStyle={this.active} className="btn btn-primary followSub">Follow</NavLink>
            </div>
        ); 
      // }
  }

  render() {
        return (
            this.cards()
    );
  }
}
export default Home