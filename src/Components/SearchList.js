import React, {Component} from 'react'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { NavLink } from "react-router-dom";

//TODO:check if the user is allready follows this subject
//TODO: fix background of subject


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