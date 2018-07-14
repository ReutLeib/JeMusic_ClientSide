import React, {Component} from 'react'

 class Profile extends Component {
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
export default Profile