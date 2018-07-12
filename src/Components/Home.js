import React, {Component} from 'react'
// import { NavLink } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
        return (
            <div>
              <div>{this.props.children}</div>
            </div>
        ); 
  }
}
export default Home