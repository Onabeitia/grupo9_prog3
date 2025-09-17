import React, {Component} from 'react';
import './styles.css'

class Detalle extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: null,
            error: null,
            cargando: true,
            esFavorito: false 
        };
    }

        componentDidMount(){
            const tipo = this.props.match.params.tipo
            const id = this.props.match.params.id
            const recupero = localStorage.getItem('favoritos')
            const favoritosArray = recupero ? JSON.parse(recupero) : [];
            const esFavorito = favoritosArray.find(f => f && f.id === id)
            if (esFavorito) this.setState({esFavorito: true})

            const endpoint = (tipo === 'pelicula') ? 
            `https://api.themoviedb.org/3/movie/${id}?api_key=04e6a27eeae7267e69af197c8db319ff`
            : `https://api.themoviedb.org/3/tv/${id}?api_key=04e6a27eeae7267e69af197c8db319ff`

            fetch(endpoint)
	            .then((response) => response.json())
	            .then((data) => this.setState({
                    data: data || null,
                    cargando: false 
         } ))
	        .catch((error) => this.setState({error: error.message, cargando: false}))
        };
        agregarFavorito= () => {
           const recupero = localStorage.getItem('favoritos')
            const tipo = this.props.match.params.tipo
            const id = this.props.match.params.id
            const favoritosArray = recupero ? JSON.parse(recupero) : [];
            const esFavorito = favoritosArray.find(f => f && f.id === id)
                if (!esFavorito){
                        favoritosArray.push({id: id.toString(), type: tipo})
                        localStorage.setItem( "favoritos", JSON.stringify(favoritosArray))
                        this.setState({ esFavorito: true });
                    }}
      
        eliminarFavorito = () => {
      const { id } = this.props.match.params;
      const recupero = localStorage.getItem('favoritos');
      const favoritosArray = recupero ? JSON.parse(recupero) : [];
      const actualizado = favoritosArray.filter(f => !(f && String(f.id) === String(id)));
      localStorage.setItem('favoritos', JSON.stringify(actualizado));
      this.setState({ esFavorito: false });
        }
       
    render() {
        const tipo = this.props.match.params.tipo
        const data = this.state.data
        const cargando = this.state.cargando 
        const error = this.state.error
        const esFavorito = this.state.esFavorito;
       
        if (cargando) return <section className="detalle-container"><p>Cargando…</p></section>;
        if (error) return <section className="detalle-container"><p style={{ color: 'red' }}>Error: {error}</p></section>;
        if (!data) return null;

    // Campos comunes
    const poster = data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '';
    const titulo = (tipo === 'pelicula') ? (data.title || data.original_title) : (data.name || data.original_name);
    const rating = (data.vote_average != null) ? data.vote_average : '';
    const fechaEstreno = (tipo === 'pelicula') ? data.release_date : data.first_air_date;
    const sinopsis = data.overview 
    const generos = data.genres?.map(g => g.name).join(', ') || '';
    const duracionMin = (tipo === 'pelicula') ? data.runtime : null; // solo película

    return (
      <section className="detalle-container">
        {poster && <img className="detalle-poster" src={poster} alt={titulo} />}
        <div className="home">
          <h1 className='detalle'>{titulo}</h1>

          <p className='detalle'><strong>Calificación:</strong> {rating}</p>
          <p className='detalle'><strong>Fecha de estreno:</strong> {fechaEstreno || '—'}</p>
          {tipo === 'pelicula' && (
            <p className='detalle'><strong>Duración:</strong> {duracionMin ? `${duracionMin} min` : '—'}</p>
          )}
          <p><strong>Género(s):</strong> {generos}</p>
          <p className="detalle"><strong>Sinopsis:</strong> {sinopsis}</p>

          {esFavorito ? (
            <button className='detalle__acciones' onClick={this.eliminarFavorito}>Quitar de favoritos</button>
          ) : (
            <button className='detalle__acciones' onClick={this.agregarFavorito}>Agregar a favoritos</button>
          )}
        </div>
      </section>
    );
        }
}
export default Detalle;
