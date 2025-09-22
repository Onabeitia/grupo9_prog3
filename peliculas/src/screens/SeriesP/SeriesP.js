import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import './styles.css';
import BuscadorFiltrado from "../../components/BuscadorFiltrado/BuscadorFiltrado";

class SeriesP extends Component {
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
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=04e6a27eeae7267e69af197c8db319ff')
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
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=04e6a27eeae7267e69af197c8db319ff&page=${this.state.paginaAlLlamar}`)
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
        <h2>Series populares</h2>
        {this.state.pedidoInicialCompleto ?
          <article>
            <div className="grid">
            {(() => {
              const filtradas = this.state.peliculas.filter((serie) => {
                let titulo = '';
                if (serie && (serie.name || serie.original_name)) {
                  titulo = (serie.name || serie.original_name).toLowerCase();
                }
                let value = '';
                if (this.state.query) {
                  value = this.state.query.toLowerCase();
                }
                return titulo.includes(value);
              });
              if (filtradas.length === 0) {
                return <p className="error">No hay resultados de búsqueda.</p>;
              }
              return filtradas.map((serie) => (
                <Cards key={serie.id} movie={serie} />
              ));
            })()}
            </div>
            <button className="botonCargar" onClick={() => this.cargarMas()}>Cargar Más</button>
          </article>
          : <p className="loader-general">Cargando información de películas…</p>
        }
      </main>
    );
  }
}
export default SeriesP;