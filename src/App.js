//Colori
//Rosso: #EF767A
//Blu: #456990

import React, { Component } from 'react';
import './App.css';
import './animation.css';
import MovieRow from './MovieRow.js';
import $ from 'jquery';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.performSearch("jurassic park");
  }

  performSearch(searchTerm) {
    var strUrl = "https://api.themoviedb.org/3/search/movie?api_key=a79a8b956adb571297697db0a95d2040&query=" + searchTerm;
    $.ajax({
      url: strUrl,
      success: (searchResults) => {
        const results = searchResults.results;

        var movieRows = [];

        results.forEach(movie => {
          movie.poster_src = "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" + movie.poster_path;
          movie.year = movie.release_date ? movie.release_date.substring(0, 4) : "";
          const curr_movie = <MovieRow key={movie.id} movie={movie} />;
          movieRows.push(curr_movie);
        });

        this.setState({ rows: movieRows });

      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data");
      }

    })

  }

  searchChangeHandler(event) {
    console.log(event.target.value);
    const boundObject = this;
    const searchTerm = event.target.value;
    boundObject.performSearch(searchTerm);
  }

  render() {
    return (
      <div className="App">
        <table className="title">
          <tbody>
            <tr>
              <td>
                <img alt="logo" width="100" src="logo.png" />
              </td>
              <td width="8" />
              <td>
                <h1 className="mtb-16">MovieDB</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input className="search-bar" onChange={this.searchChangeHandler.bind(this)} placeholder="Type something boy" />

        {this.state.rows}

      </div>
    );
  }
}

export default App;