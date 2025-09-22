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
    var favoritosRecuperados = localStorage.getItem('favoritos');
    var favoritosArray = favoritosRecuperados ? JSON.parse(favoritosRecuperados) : [];

    if (!favoritosArray.length) {
      this.setState({ favoritosMovie: [], favoritosTV: [], loading: false });
      return;
    }

    const favoritosMovie = [];
    const favoritosTV = [];

   function definirTipo(type) {
      if (type === 'serie') {
        return 'tv';
      } else if (type === 'pelicula') {
        return 'movie';
      } else {
        return type;
      }
    }

    const procesar = (index) => {
      if (index >= favoritosArray.length) {
        this.setState({ favoritosMovie: favoritosMovie, favoritosTV: favoritosTV, loading: false });
        return;
      }

      const item = favoritosArray[index];
      const id = item.id;
      const tipo = definirTipo(item.type);
      const api = 'https://api.themoviedb.org/3/' + tipo + '/' + id + '?api_key=04e6a27eeae7267e69af197c8db319ff&language=es-ES';

      fetch(api)
        .then(function(res) { return res.json(); })
        .then(function(data) {
          if (data && data.id) {
            if (tipo === 'movie') {
              favoritosMovie.push(data);
            } else if (tipo === 'tv') {
              favoritosTV.push(data);
            }
          }
          procesar(index + 1);
        })
        .catch(function() {
          procesar(index + 1);
        });
    };

    procesar(0);
  }

  render() {
    const  favoritosTV = this.state.favoritosTV;
    const favoritosMovie = this.state.favoritosMovie;
    const  loading = this.state.loading;

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
                <Cards key={item.id} movie={item} />
              ))}
            </div>
          </section>
        )}

        {favoritosTV && favoritosTV.length > 0 && (
          <section className="bloque-favoritos bloque-series">
            <h2>Series favoritas</h2>
            <div className="grid">
              {favoritosTV.map((item) => (
                <Cards key={item.id} movie={item} />
              ))}
            </div>
          </section>
        )}
      </main>
    );
  }
}

export default Favoritos;