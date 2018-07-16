
/*  -----------------------------------------------------------
    ----------------------------------------------------------- 
    copyrights reserve to Reut Leib && Tal Chausho Gur-Arie
    ----------------------------------------------------------- 
    ----------------------------------------------------------- 
    */

import React, {Component} from 'react'

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