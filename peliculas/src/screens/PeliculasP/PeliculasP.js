import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import './styles.css';

class PeliculasP extends Component {
  constructor(props){
    super(props)
    this.state = {
        peliculas: [],
        pedidoInicialCompleto: false,
        paginaAlLlamar: 1,
    }
}
  componentDidMount(){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=04e6a27eeae7267e69af197c8db319ff')
  .then((response) => response.json() )
  .then((data) => this.setState({
        peliculas: data.results || [], 
        pedidoInicialCompleto: true,
        paginaAlLlamar: this.state.paginaAlLlamar + 1}
    ))
  .catch( error => console.log(error) );
}

cargarMas(){
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=04e6a27eeae7267e69af197c8db319ff&page=${this.state.paginaAlLlamar}`)
  .then((response) => response.json() )
  .then((data) => this.setState({
        peliculas:(this.state.peliculas).concat(data.results),
        pedidoInicialCompleto: true,
        paginaAlLlamar: this.state.paginaAlLlamar + 1}
    ))
  .catch( error => console.log(error) );
}

render(){
    return(
        <main className="home">
            <h2>Peliculas populares</h2>
            { this.state.pedidoInicialCompleto ?
            <article>
                <div className="grid">
                    {this.state.peliculas.map((movie) => (
                    <Cards key={movie.id} movie={movie} />
                    ))}
                </div>
                <button className="botonCargar" onClick={() => this.cargarMas()}>Cargar Más</button>
            </article>
            :  <p className="loader-general">Cargando información de películas…</p>
            }
        </main>
    );
}
}
export default PeliculasP;