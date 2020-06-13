import React, { useState } from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types'

import Error from './Error'

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, actualizarNombre] = useState('')
    const [cantidad, actualizarCantidad] = useState(0)
    const [error, actualizaError] = useState(false)

    const gasto = e => {
        e.preventDefault()

        //validar
        if( cantidad<1 || isNaN(cantidad) || nombre.trim()===''){
            actualizaError(true)
            return
        }
        
        actualizaError(false)

        //construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true)

        //resetear el formulario
        actualizarNombre('');
        actualizarCantidad(0);
    }

    return (
        <form onSubmit={gasto}>
            <h2>Agrega tus gastos aquí</h2>

            { error && <Error mensaje="El nombre o la cantidad es incorrecta"/> }

            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Expensas"
                    value={nombre}
                    onChange={ e => actualizarNombre( e.target.value ) }
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange = { e => actualizarCantidad( parseInt(e.target.value, 10) ) }
                />
            </div>
            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
    );
}
 
Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}

export default Formulario;