import React, { useEffect, useState } from 'react';
import {Modal} from './Componets/Modal/Modal';
import {Contato} from './Componets/Contato/Contato';
import './App.css';

function App() {

const [nome, setNome] = useState('');
const [telefone, setTelefone] = useState('');
const [email, setEmail] = useState('');
const [listaContatos, setListaContatos] = useState([]);
const[showModal,setShowModal] = useState(false);
const[contatoToDelete, setContatoToDelete] = useState();
const [isUpadate, setIsUpdate] = useState();




const handleSubmit = async (event) => {
  event.preventDefault();
   const data = {
    'nome':nome,
    'telefone':telefone,
    'email': email,

   }

  console.log('data', data);

  const response = await fetch('http://localhost:3000/contatos/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {"Content-type": "application/json; charset=UTF-8"}

    });

    if (response.ok) {
       console.log("OKS", response.ok);
       fetchAll();
    }   
    else
      console.log('ERRO');   
    
}

  function fetchAll() {
    fetch('http://localhost:3000/contatos/')
      .then((response) => response.json())
      .then(data => setListaContatos(data))
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async () => {
    const response = await fetch('http://localhost:3000/contatos/'+ contatoToDelete, {
    method: 'DELETE',
  } )

if (response.ok) {
  alert("Deletadeo con suceso");
  fetchAll();
   }
   setShowModal(false);
  }

   const onDelete = (contatoId) => {
    setContatoToDelete(contatoId);
    setShowModal(true);

   }

   const handleCancelar = () => {
    setContatoToDelete('');
    setShowModal(false);
   }

   const onUpdate = (contatoId) => {
    fetch('http://localhost:3000/contatos/' + contatoId)
    .then((response) => response.json())
    .then(data => { 
      console.log('alterar', data);
      setIsUpdate(contatoId);
      setNome(data.nome);
      setTelefone(data.telefone);
      setEmail(data.email);
      
    });
   }

   const handleUpdate = async () => {
    const contatoId = isUpadate
    const response = await fetch('http://localhost:3000/contatos/' + contatoId, {
      method:"PATCH",
      body: JSON.stringify({
         nome:nome,
         telefone :telefone,
         email: email,
      }),
      headers: {"Content-type":  "application/json; charset=UTF-8"}
    });
     
      
    if (response.ok)
       console.log("OKS", response.ok);
       setIsUpdate(undefined);
       setNome('');
       setTelefone('');
       setEmail('');
       fetchAll();
  }
  

  return (
    <div className="App">
      <form onSubmit={isUpadate ? handleUpdate: handleSubmit}>
      <div className='formRow' >
          <label>Nome</label>
          <input 
          type='text'
          value={nome}  
          onChange= {(e) => setNome(e.target.value)} />
        </div>
       
        <div className='formRow' >
          <label>Telefone</label>
          <input 
          type='text'
          value={telefone}  
          onChange= {(e) => setTelefone(e.target.value)} />
        </div>
        
        <div className='formRow'>
          <label>E-mail</label>
          <input 
          type='text'
          value={email}  
          onChange= {(e) => setEmail(e.target.value)} />
        </div>
      
        <button type='submit'>{isUpadate ? 'Editar' : 'Cadastrar'}</button>
      </form>
      <div className='contatos-agenda'>
        <h3>Agenda de Contatos</h3>
        <ul>
          {listaContatos.map((contato, index) => {
            return (
              <Contato
              key={contato.id}
              contato={contato}
              index={index}
              onDelete={(id) => onDelete(id)}
              onUpdate={ (id) => onUpdate (id)}
              />
            )
          })}
        </ul>
      </div>
    {
      showModal &&
      <Modal
      handleCancelar={handleCancelar}
      handleDelete={handleDelete}
      />
    }

    </div>
  );
}

export default App;
