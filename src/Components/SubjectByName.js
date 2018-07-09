import React, {Component} from 'react'

class Subject extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
      return (
        <div>{this.props.children}</div>
    );
  }
}
export default Subject