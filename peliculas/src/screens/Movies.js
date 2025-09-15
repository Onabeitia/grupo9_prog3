import React, {Component} from 'react'

class Movies extends Component {
    constructor(props){
        super(props);
        this.state= {
            movies: ''
        }
    }
    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1')
        .then( response => response.json)
        .then(data => this.setState(
            {
                peliculas: data.results,
            }
        ))
        .catch(error => console.log(error))
    }
}




