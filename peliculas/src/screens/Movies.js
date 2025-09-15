import React, {Component} from 'react'

class Movies extends Component {
    constructor(props){
        super(props);
        this.state= {
            movies: ''
        }
    }
    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=04e6a27eeae7267e69af197c8db319ff')
        .then( response => response.json)
        .then(data => this.setState(
            {
                peliculas: data.results,
            }
        ))
        .catch(error => console.log(error))
    }
    render() {
        return (
            <div>
                {this.state.peliculas.map(movie => (
                    <p key={movie.id}>{movie.title}</p>
                ))}
            </div>
        )
    }
}




