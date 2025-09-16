import React, { Component } from "react";
import Cards from "../../components/Cards/Cards";
import Buscador from "../../components/Buscador/Buscador"; 
import "./styles.css"

class Series extends Component{
    constructor(props){
        super(props)
        this.state = {
            series: [],
            pedidoInicialCompleto: false,
            paginaAlLlamar: 1,
        }
    }
    componentDidMount(){
        fetch('https://api.themoviedb.org/3/tv/on_the_air?api_key=04e6a27eeae7267e69af197c8db319ff')
	    .then((response) => response.json() )
	    .then((data) => this.setState({
            series: data.results || [], 
            pedidoInicialCompleto: true,
            paginaAlLlamar: this.state.paginaAlLlamar + 1}
        ))
	    .catch( error => console.log(error) );
    }

    cargarMas(){
        fetch(`https://api.themoviedb.org/3/tv/on_the_air?api_key=04e6a27eeae7267e69af197c8db319ff&page=${this.state.paginaAlLlamar}`)
	    .then((response) => response.json() )
	    .then((data) => this.setState({
            series:(this.state.series || []).concat(data.results || []),
            pedidoInicialCompleto: true,
            paginaAlLlamar: this.state.paginaAlLlamar + 1}
        ))
	    .catch( error => console.log(error) );
    }

    render(){
        return(
            <main className="home">
                 <Buscador onChange={(valor) => this.setState({ query: valor })} onSubmit={(valor) => console.log('Buscar:', valor)} />
                <h1>Todas las series</h1>
                { this.state.pedidoInicialCompleto ?
                <article>
                    <div className="grid">
                        {this.state.series.map((movie) => (
                        <Cards key={movie.id} movie={movie} />
                        ))}
                    </div>
                    <button className="botonCargar" onClick={() => this.cargarMas()}>Cargar Más</button>
                </article>
                :  <p className="loader-general">Cargando información de series...</p>
                }
            </main>
        );
    }
}

export default Series

