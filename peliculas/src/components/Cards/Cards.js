import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
class Cards extends Component {
  constructor(props){
    super(props);
    this.state = {
      verMas: false,
      esFavorito: false
    };
  }
  componentDidMount(){
    const movie = this.props.movie;
    const recupero = localStorage.getItem('favorito');
    const favorito = JSON.parse(recupero);
    if (movie && favorito && favorito.includes(movie.id)) {
      this.setState({ esFavorito: true });
    }
  }
  verMasVerMenos = () => {
    this.setState({ verMas: !this.state.verMas });
  }
  agregarFavorito = (id) => {
    const recupero = localStorage.getItem('favorito');
    const favorito = JSON.parse(recupero);
    if (!favorito) {
      localStorage.setItem('favorito', JSON.stringify([id]));
      this.setState({ esFavorito: true });
    } else {
      if (!favorito.includes(id)) {
        favorito.push(id);
        localStorage.setItem('favorito', JSON.stringify(favorito));
        this.setState({ esFavorito: true });
      }
    }
  }
  eliminarFavorito = (id) => {
    const recupero = localStorage.getItem('favorito');
    const favorito = JSON.parse(recupero);
    if (favorito) {
      const actualizado = favorito.filter(function(favId){ return favId !== id; });
      localStorage.setItem('favorito', JSON.stringify(actualizado));
      this.setState({ esFavorito: false });
    }
  }
  render(){
    const movie = this.props.movie || {};
    const titulo = movie.title || movie.name ;
    return (
      <article className="card">
          <img src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt={titulo} />
        <h4>{titulo}</h4>
        <div className="acciones">
          <button onClick={this.verMasVerMenos}>
            {this.state.verMas ? 'Ocultar descripción' : 'Ver descripción'}
          </button>
          <Link to={`/detalle/${movie.id}`}>Ir a detalle</Link>
          {this.state.esFavorito ? (
            <button onClick={() => this.eliminarFavorito(movie.id)}>Quitar de favoritos</button>
          ) : (
            <button onClick={() => this.agregarFavorito(movie.id)}>Agregar a favoritos</button>
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