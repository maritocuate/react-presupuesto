import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types'

import Error from './Error.js'

const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    const [cantidad, guardarCantidad] = useState(0)
    const [error, guardaError] = useState(false)

    const definirPresupuesto = e => {
        guardarCantidad( parseInt(e.target.value) )
    }

    const guardaPresupuesto = e => {
        e.preventDefault()

        //Valido
        cantidad < 1 ? guardaError(true) : guardaError(false)

        //Guardo
        guardarPresupuesto(cantidad)
        guardarRestante(cantidad)
        actualizarPregunta(false)
    }

    return ( 
        <Fragment>
            <form onSubmit={guardaPresupuesto}>
                <h2>Coloca tu presupuesto</h2>

                { error ? <Error mensaje="El presupuesto es incorrecto"/> : null }

                <input type="number" className="u-full-width" placeholder="ingrese un presupuesto" onChange={definirPresupuesto} />
                <input type="submit" className="u-full-width button-primary" value="definir presupuesto" />
            </form>
        </Fragment>
    );
}

Pregunta.propTypes = {
    guardarPresupuesto: PropTypes.func.isRequired,
    guardarRestante: PropTypes.func.isRequired,
    actualizarPregunta: PropTypes.func.isRequired
}
 
export default Pregunta;