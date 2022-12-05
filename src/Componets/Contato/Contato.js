import React from "react";
import './Contato.css';


const Contato = ({contato, index, onDelete, onUpdate}) => {
    return (
      <li style={{backgroundColor: index%2 ? '#FFFFFF' : '#e7E7ee'}}>
      <span>{contato.nome} - {contato.telefone} - {contato.email}</span>
      <button onClick={() => onDelete(contato.id)}>Remover</button>
      <button onClick={() => onUpdate(contato.id)}>Editar</button>
     </li>
    )
}

export {Contato}