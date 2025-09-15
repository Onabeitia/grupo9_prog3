import React, { Component } from 'react';
import Cards from '../../components/Cards/Cards';
import Buscador from '../../components/Buscador/Buscador';
import './styles.css';

 class Populares extends Component {
  constructor(props){
    super(props);
    this.state = { peliculas: [], query: '' };
  }

  componentDidMount(){
    this.cargarPeliculas();
  }

  cargarPeliculas = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=04e6a27eeae7267e69af197c8db319ff&language=es-ES&page=1')
      .then(r => r.json())
      .then(data => {
        const nuevas = data && data.results ? data.results : [];
        this.setState({ peliculas: nuevas });
      })
      .catch(() => this.setState({ peliculas: [] }));
  }
 // --- Formulario controlado ---
 evitarSubmit = (e) => { e.preventDefault(); };
 controlarCambios = (e) => { this.setState({ query: e.target.value }); };


 // --- Filtro simple por título usando .filter (apuntes) ---
 filtrarPorQuery = (buscado) => {
   const busqueda = (this.state.query || '').trim().toLowerCase();
   if (!busqueda) return buscado;
   return buscado.filter(function(pelicula){
     const titulo = (pelicula.title || '').toLowerCase();
     return titulo.includes(busqueda);
   });
 };


  render(){
    const { peliculas } = this.state;
    const peliculasFiltradas = this.filtrarPorQuery(peliculas);
    return (
      <main className="home">
         <Buscador  onChange={(valor) => this.setState({ query: valor })} onSubmit={(valor) => console.log('Buscar:', valor)}/>
        <header className="grupo__header">
          <h2>Películas más populares</h2>
        </header>

        <div className="grid">
          {peliculasFiltradas.map(function(movie){
            return <Cards key={movie.id} movie={movie} />;
          })}
        </div>
      </main>
    );
  }
}
export default Populares;