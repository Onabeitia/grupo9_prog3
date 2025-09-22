import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import './styles.css';
import BuscadorFiltrado from "../../components/BuscadorFiltrado/BuscadorFiltrado";

class PeliculasP extends Component {
  constructor(props) {
    super(props)
    this.state = {
      peliculas: [],
      pedidoInicialCompleto: false,
      paginaAlLlamar: 1,
      query: ''

    }
  }
  componentDidMount() {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=04e6a27eeae7267e69af197c8db319ff')
      .then((response) => response.json())
      .then((data) => this.setState({
        peliculas: data.results || [],
        pedidoInicialCompleto: true,
        paginaAlLlamar: this.state.paginaAlLlamar + 1
      }
      ))
      .catch(error => console.log(error));
  }

  cargarMas() {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=04e6a27eeae7267e69af197c8db319ff&page=${this.state.paginaAlLlamar}`)
      .then((response) => response.json())
      .then((data) => this.setState({
        peliculas: (this.state.peliculas).concat(data.results),
        pedidoInicialCompleto: true,
        paginaAlLlamar: this.state.paginaAlLlamar + 1
      }
      ))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <main className="home">
        <BuscadorFiltrado onChange={(valor) => this.setState({ query: valor })} onSubmit={(valor) => console.log('Buscar:', valor)} /> 
        <h2>Peliculas populares</h2>
        {this.state.pedidoInicialCompleto ?
          <article>
            <div className="grid">
              {this.state.peliculas.filter((movie)=>{
                let titulo=''
                if (movie && movie.title){ 
                  titulo=movie.title.toLowerCase();
                }
                let value=''
                if (this.state.query) {
                  value=this.state.query.toLowerCase(); 
                }
                return titulo.includes(value);
              }).map(movie => (
                <Cards key={movie.id} movie={movie} />
              ))}
            </div>
            <button className="botonCargar" onClick={() => this.cargarMas()}>Cargar Más</button>
          </article>
          : <p className="loader-general">Cargando información de películas…</p>
        }
      </main>
    );
  }
}
export default PeliculasP;