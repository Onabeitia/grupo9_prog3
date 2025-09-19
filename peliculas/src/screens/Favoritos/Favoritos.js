import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import './style.css';

class Favoritos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritosMovie: [],
      favoritosTV: [],
      loading: true
    };
  }

  componentDidMount() {
    const favoritosRecuperados = localStorage.getItem('favoritos'); // [{id, type}, ...]
    const favoritosArray = favoritosRecuperados ? JSON.parse(favoritosRecuperados) : [];

    if (!favoritosArray.length) {
      this.setState({ favoritosMovie: [], favoritosTV: [], loading: false });
      return;
    }

    const favoritoItems = favoritosArray.map(favoritoItem => ({ id: favoritoItem.id, type: favoritoItem.type }));

    const acumulado = [];

    favoritoItems.forEach(({ id, type }) => {
      const base = type === 'serie' ? 'tv' : type;
      const tipo = (base === 'pelicula' || base === 'movie') ? 'movie' : base; // default movie

      fetch(`https://api.themoviedb.org/3/${tipo}/${id}?api_key=04e6a27eeae7267e69af197c8db319ff&language=es-ES`)
        .then(res => res.json())
        .then(item => {
          // anexamos el tipo normalizado para separar luego
          acumulado.push({ ...item, __type: tipo });
          if (acumulado.length === favoritoItems.length) {
            const favoritosMovie = acumulado.filter(type => type && type.__type === 'movie');
            const favoritosTV = acumulado.filter(type => type && type.__type === 'tv');
            this.setState({ favoritosMovie, favoritosTV, loading: false });
          }
        })
        .catch(() => {
          acumulado.push(null);
          if (acumulado.length === favoritoItems.length) {
            const favoritosMovie = acumulado.filter(item => item && item.__type === 'movie');
            const favoritosTV = acumulado.filter(item => item && item.__type === 'tv');
            this.setState({ favoritosMovie, favoritosTV, loading: false });
          }
        });
    });
  }

  render() {
    const { favoritosMovie, favoritosTV, loading } = this.state;

    if (loading) return <h2>Cargando favoritos...</h2>;
    const vacias = (!favoritosMovie || favoritosMovie.length === 0) && (!favoritosTV || favoritosTV.length === 0);
    if (vacias) return <h2>No seleccionaste ningun favorito.</h2>;

    return (
      <main className="home">

        {favoritosMovie && favoritosMovie.length > 0 && (
          <section className="bloque-favoritos bloque-peliculas">
            <h2 className='titulo'>Películas favoritas</h2>
            <div className="grid">
              {favoritosMovie.map((item) => (
                <Cards key={`m-${item.id}`} movie={item} />
              ))}
            </div>
          </section>
        )}

        {favoritosTV && favoritosTV.length > 0 && (
          <section className="bloque-favoritos bloque-series">
            <h2>Series favoritas</h2>
            <div className="grid">
              {favoritosTV.map((item) => (
                <Cards key={`t-${item.id}`} movie={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    );
  }
}

export default Favoritos;