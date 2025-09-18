import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../../components/Cards/Cards';
import './styles.css'
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      popular: [],
      valoradas: []
    };
  };
  componentDidMount() {
    // Dejo TUS fetch tal cual (apuntes: fetch -> then -> response.json())
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=04e6a27eeae7267e69af197c8db319ff&language=es-ES&page=1')
      .then(r => r.json())
      .then(data => this.setState({ popular: data.results || [] }))
      .catch(() => this.setState({ popular: [] }));
    fetch('https://api.themoviedb.org/3/tv/popular?api_key=04e6a27eeae7267e69af197c8db319ff&language=es-ES&page=1')
      .then(r => r.json())
      .then(data => this.setState({ valoradas: data.results || [] }))
      .catch(() => this.setState({ valoradas: [] }));
  };
  // --- Formulario controlado ---
  evitarSubmit = (e) => { e.preventDefault(); };
  controlarCambios = (e) => { this.setState({ query: e.target.value }); };
  // --- Filtro simple por título usando .filter (apuntes) ---
  filtrarPorQuery = (buscado) => {
    const busqueda = this.state.query.trim().toLowerCase();
    if (!busqueda) return buscado;
    return buscado.filter(pelicula => (pelicula.title || '').toLowerCase().includes(busqueda));
  };
  render() {
    const popularesFiltradas = this.filtrarPorQuery(this.state.popular);
    const valoradasFiltradas = this.filtrarPorQuery(this.state.valoradas);
    return (
      <main className="home">

        <section className="grupo">
          <header className="grupo__header">
            <h2>Películas más populares</h2>
            <Link to="/peliculasp">Ver todas</Link>
          </header>
          <div className="grid">
            {popularesFiltradas.slice(0, 4).map(movie => (
              <Cards key={movie.id} movie={movie} />))}
          </div>
        </section>
      
        <section className="grupo">
          <header className="grupo__header">
            <h2>Series más populares</h2>
            <Link to="/seriesp">Ver todas</Link>
          </header>
          <div className="grid">
            {valoradasFiltradas.slice(0, 4).map(movie => (
              <Cards key={movie.id} movie={movie} />))}
          </div>


        </section>

        {(this.state.loadingPopular || this.state.loadingValoradas) && (
          <p className="loader-general">Cargando información de películas…</p>
        )}
      </main>
    );
  }
};
export default Home;