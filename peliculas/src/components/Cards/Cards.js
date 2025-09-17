import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verMas: false,
      esFavorito: false
    };
  }
  inferirTipo(movie) {
    if (movie && movie.name && !movie.title) return 'serie';
    return 'pelicula';
  }
  componentDidMount() {
    const movie = this.props.movie;
    const recupero = localStorage.getItem('favoritos'); // usamos plural y objetos
    const favoritosArray = recupero ? JSON.parse(recupero) : [];
    if (movie && favoritosArray.find(f => f && f.id === movie.id)) {
      this.setState({ esFavorito: true });
    }
  }
  verMasVerMenos = () => {
    this.setState({ verMas: !this.state.verMas });
  }
  agregarFavorito = (movie) => {
    if (!movie || !movie.id) return;
    const tipo = this.inferirTipo(movie);
    const recupero = localStorage.getItem('favoritos');
    const favoritosArray = recupero ? JSON.parse(recupero) : [];
    const yaEsta = favoritosArray.find(f => f && f.id === movie.id);
    if (!yaEsta) {
      favoritosArray.push({ id: movie.id, type: tipo });
      localStorage.setItem('favoritos', JSON.stringify(favoritosArray));
      this.setState({ esFavorito: true });
    }
  }
  eliminarFavorito = (id) => {
    const recupero = localStorage.getItem('favoritos');
    const favoritosArray = recupero ? JSON.parse(recupero) : [];
    const actualizado = favoritosArray.filter(f => f && f.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(actualizado));
    this.setState({ esFavorito: false });
  }
  render() {
    const movie = this.props.movie || {};
    const titulo = movie.title || movie.name || 'Sin título';
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w342${movie.poster_path}` : '';
    return (
      <article className="card">
        {poster ? <img src={poster} alt={titulo} /> : null}
        <h4>{titulo}</h4>
        <div className="acciones">
          <button onClick={this.verMasVerMenos}>
            {this.state.verMas ? 'Ocultar descripción' : 'Ver descripción'}
          </button>
          <Link to={`/detalle/${this.inferirTipo(movie)}/${movie.id}`}>Ir a detalle</Link>
          {this.state.esFavorito ? (
            <button onClick={() => this.eliminarFavorito(movie.id)}>Quitar de favoritos</button>
          ) : (
            <button onClick={() => this.agregarFavorito(movie)}>Agregar a favoritos</button>
          )}
        </div>
        {this.state.verMas && (
          <p className="descripcion">
            {movie.overview}
          </p>
        )}
      </article>
    );
  }
}
export default Cards;