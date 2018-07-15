import React, {Component} from 'react'
import 'react-notifications/lib/notifications.css';


class SearchList extends Component {
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

export default SearchList