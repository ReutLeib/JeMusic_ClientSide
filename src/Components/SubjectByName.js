import React, {Component} from 'react'
import { NavLink } from "react-router-dom";

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
      return (

          <div >
            <div>{this.props.children}</div>
            <NavLink to="/Subject" activeStyle={this.active} className="btn btn-primary followSub">Join</NavLink>
          </div>
    );
  }
}
export default Subject