import React from "react";
import './Modal.css';


const Modal  = ({handleCancelar,handleDelete}) => {
    return(
  
      <div className='modal-background'>
        <div className='modal-content'>
          <h4> Você tem certeza de remover este contato?</h4>
          <label>Esta ação é irreversivel</label>
          <div className='modal-buttons'>
            <button onClick={handleDelete}>Confirmar</button>
            <button className='Canc' onClick={handleCancelar}>Cancelar</button>
          </div>
        </div>
      </div>

    )     
}

  export  {Modal};