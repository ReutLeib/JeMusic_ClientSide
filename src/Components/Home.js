import React, {Component} from 'react'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
          return (
      <div className='book'>
          <div>{this.props.children}</div>
          <a href="#" class="btn btn-primary followSub">Follow</a>
        </div>
    );
  }
}
export default Home