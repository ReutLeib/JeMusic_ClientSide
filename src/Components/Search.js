import React, { Component } from 'react'
import SearchList from './SearchList'
import ReactDOM from 'react-dom'
import MdSend from "react-icons/lib/md/send";


class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {newRank:0}

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleRankChange=this.handleRankChange.bind(this);
    }

  add(txt1,txt2,txt3,txt4,txt5,txt6,txt7,txt8,txt9) {
    this.setState(prevState => ({
      subjects: [
      ...prevState.subjects,
      {
          id: this.nextID(),
          name: txt1,
          date: txt2,
          hours: txt3,
          type: txt4,
          location: txt5,
          about: txt6,
          price: txt7,
          requredSkills: txt8,
          background: txt9
          
      }]
    }))
  }

  handleRankChange(event){
    this.setState({newRank: event.target.value})
  }

    handleSubmit(event){
        event.preventDefault();
        let newRank = this.state.newRank;
        (async () => {
          const rawResponse = await fetch('https://jemusic.herokuapp.com/getSubjectByDate/', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({date:newRank})
          });
            const content = await rawResponse.json();
            ReactDOM.render(<SearchList subjects={content} />, document.getElementById("response"))
        })();
    }


    render() {
        return (
            <div>
                <form action="https://jemusic.herokuapp.com/getSubjectByDate/" method="POST" onSubmit={this.handleSubmit}>
                  <label>
                    <p> Date format: 2/10/2018</p>
                    Date:
                    <input onChange={this.handleRankChange} value={this.state.newRank} type="text" name="date" />                  
                  </label>
                   <button  type="submit" className="btn btn-primary" onClick={this.delete}><MdSend/> </button> 
                </form>
                <div id="response">
                </div>
            </div>
        )
    }
}

export default Search