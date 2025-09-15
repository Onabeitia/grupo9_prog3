import React, {Component} from 'react';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
          popular: [],
          valoradas: []
        };
      }
     
     
      componentDidMount(){
 
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=04e6a27eeae7267e69af197c8db319ff&language=es-ES&page=1')
          .then(r => r.json())
          .then(data => this.setState({ popular: data.results || [] }))
          .catch(() => this.setState({ popular: [] }));
     
     
       
        fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=04e6a27eeae7267e69af197c8db319ff&language=es-ES&page=1')
          .then(r => r.json())
          .then(data => this.setState({ valoradas: data.results || [] }))
          .catch(() => this.setState({ valoradas: [] }));
      }
     
     
}

export default Home;