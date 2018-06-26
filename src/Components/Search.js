import React, { Component } from 'react'
import SearchList from './SearchList'
import ReactDOM from 'react-dom'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {newRank:0, newAuthor:0};

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleRankChange=this.handleRankChange.bind(this);
        this.handleAuthorRankChange=this.handleAuthorRankChange.bind(this);
    }

     handleRankChange(event){
        this.setState({newRank: event.target.value})
        console.log(`newRank: ${event.target.value}`)
     
     }

     handleAuthorRankChange(event){
        this.setState({newAuthor: event.target.value})
        console.log(`newAuthorRank: ${event.target.value}`)
     
     }

    handleSubmit(event){
        event.preventDefault();
        let newRank = this.state.newRank;
        let newAuthor = this.state.newAuthor;
        (async () => {
          const rawResponse = await fetch('https://jemusic.herokuapp.com/getSubjectsByFavorites/Yo', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({rank:newRank,author_rank:newAuthor})
          });
            const content = await rawResponse.json();
            ReactDOM.render(<SearchList books={content} />, document.getElementById("response"))
            console.log(content);
        })();
    }

    render() {
        return (
            <div>
                <form action="https://jemusic.herokuapp.com/getSubjectsByFavorites/Yo" method="POST" onSubmit={this.handleSubmit}>
                    <label>
                    (Enter Rank: 9, Author: 9.5)<br></br>
                        Rank:
                        <input onChange={this.handleRankChange} value={this.state.newRank} type="text" name="rank" />
                      </label>
                    <label>
                        Author:
                        <input onChange={this.handleAuthorRankChange} value={this.state.newAuthor} type="text" name="author_rank" />
                      </label>
                    <input type="submit" value="Send" />
                </form>
                <div id="response">
                </div>
            </div>
        )
    }
}
export default Search