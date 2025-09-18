import React, { Component} from 'react'
import './styles.css'


class BuscadorFiltrado extends Component {
    constructor(props){
        super(props);
        this.state = {valor: ''}
    }
     evitarSubmit(e){
        e.preventDeafult();
        if (this.props.onSubmit){
            this.props.onSubmit(this.state.valor);
        }
    }
    controlarInput(e) {
        this.setState({valor: e.target.value}, () => {
            if (this.props.onChange){
            this.props.onChange(this.state.valor)
            }
        });
    }

  render() {
    return (
        <article>
            <form onSubmit={(e) => this.evitarSubmit(e)} className='buscadorf' >
            <input type='text' onChange={(e) => this.controlarInput(e)} value={this.state.valor} placeholder='Buscar..'/>
            <button type='submit'>Buscar</button>
            </form>
        </article>
    )
  }
}

export default BuscadorFiltrado