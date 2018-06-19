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
    let cScope = this;
    var strUrl = "https://api.themoviedb.org/3/search/movie?api_key=a79a8b956adb571297697db0a95d2040&query=" + searchTerm;
    $.ajax({
      url: strUrl,
      success: (searchResults) => {
        const results = searchResults.results;

        var movieRows = [];

        getMovieInfo(results, function () {
          console.log("Ho finito!");


          results.forEach(movie => {
            movie.poster_src = "https://image.tmdb.org/t/p/w370_and_h556_bestv2/" + movie.poster_path;
            movie.year = movie.release_date ? movie.release_date.substring(0, 4) : "";
            const curr_movie = <MovieRow key={movie.id} movie={movie} />;
            movieRows.push(curr_movie);
          });

          movieRows.sort(compare).reverse();

          cScope.setState({ rows: movieRows });

        });
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

function getMovieInfo(results, onEnd) {
  var index = 0;
  getCastInfo(results, index, function (movies) {
    console.log(movies)
    if (onEnd)
      onEnd();
  });
}

function getCastInfo(results, index, onEnd) {
  console.log(index);
  if (index > results.length - 1) {
    if (onEnd)
      onEnd(results);
  } else {
    var castUrl = "https://api.themoviedb.org/3/movie/" + results[index].id + "/credits?api_key=a79a8b956adb571297697db0a95d2040";
    $.ajax({
      url: castUrl,
      success: (searchResults) => {
        results[index].test = "ANDREA" + index;
        results[index].cast = [{
          name: ""
        }]
        if(searchResults != undefined && searchResults.cast != undefined && searchResults.cast.length > 0)
          results[index].cast = [{
            name: searchResults.cast[0].name
          }]
        index++;
        getCastInfo(results, index, onEnd);

      }
    });
  }

}

function compare(obj1, obj2) {
  let pop1 = obj1.props.movie.popularity;
  let pop2 = obj2.props.movie.popularity;

  if (pop1 < pop2)
    return -1;
  if (pop1 > pop2)
    return 1;
  return 0;
}

export default App;