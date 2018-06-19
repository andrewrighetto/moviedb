import React from 'react';

class MovieRow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spinner: "spinner",
      movie_poster: this.props.movie.poster_src
    };
  }

  //Evento chiamato se l'immagine non esiste
  handlerImageLoaded() {

    //Nel caso in cui avessi già caricato il logo.png esco altrimenti loop
    if (this.state.movie_poster === "logo.png")
      return;

    this.setState({
      spinner: "",
      movie_poster: this.props.movie.poster_src
    });
  }

  handlerImageError(element) {
    console.log("image ERROR!!");
    this.setState({
      spinner: "",
      movie_poster: "logo.png"
    });
  }


  render() {
    return <table key={this.props.movie.id} className="movie-table" >
      <tbody>
        <tr className="movie-row">
          <td className="col-left">
            <div className={`image-container ${this.state.spinner}`}>
              <img alt="poster"
                src={this.state.movie_poster}
                onLoad={this.handlerImageLoaded.bind(this)}
                onError={this.handlerImageError.bind(this)}
                className="image-loading" />
            </div>
          </td>
          <td className="col-right">
            <h2 className="inline-block">{this.props.movie.title}</h2>
            <h2 className="float-right inline-block">{this.props.movie.year}</h2>
            <hr/>
            <p>{this.props.movie.overview}</p>
            <p>{this.props.movie.cast[0].name}</p>
          </td>
        </tr>
      </tbody>
    </table>
  }
}

export default MovieRow;