import React, {Component} from 'react'

 class Video extends Component {
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
export default Video