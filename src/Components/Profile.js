import React, {Component} from 'react'

 class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
          return (
      <div className='book'>
          <div>{this.props.children}</div>
        </div>
    );
  }
}
export default Profile