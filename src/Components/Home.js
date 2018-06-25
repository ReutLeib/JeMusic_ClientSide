import React, {Component} from 'react'
import MdDelete from 'react-icons/lib/md/delete'
import MdEdit from 'react-icons/lib/md/edit'
import MdSave from 'react-icons/lib/md/save'


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
        </div>
    );
  }
}
export default Home