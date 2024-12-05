import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Trash from '../../../src/assets/trash.svg';
import api from '../../services/api';

function UsersList() {
  const navigate = useNavigate(); // Hook para navegar entre as rotas
  const [clientes, setClientes] = useState([]);

  // Função para buscar os clientes cadastrados
  async function getClientes() {
    try {
      const response = await api.get('/clientes');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }

  
  }

  // Função para deletar clientes
  async function deleteClientes(id) {
    try {
      await api.delete(`/clientes/${id}`);
      getClientes(); // Atualiza a lista após a exclusão
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
    }
  }

  // UseEffect para carregar os clientes quando o componente for montado
  useEffect(() => {
    getClientes();
  }, []);

  const backPage = () => {
    navigate("/");
  }

  return (
    <div className="containerUserList">
      <h1>Clientes Cadastrados</h1>
      {clientes.length > 0 ? (
        clientes.map((cliente) => (
          <div key={cliente.id} className="card">
            <p>Nome: {cliente.name}</p>
            <p>Endereço: {cliente.address}</p>
            <p>Número: {cliente.houseNumber}</p>
            <p>Cep: {cliente.zipCode}</p>
            <p>Telefone: {cliente.phoneNumber}</p>
            <p>Email: {cliente.email}</p>
            <button onClick={() => deleteClientes(cliente.id)}>
              <img src={Trash} alt="Excluir" />
            </button>
          </div>
        ))
      ) : (
        <p>Nenhum cliente cadastrado.</p>
      )}

       {/* Botão para ir para a página de Home */}
       <button className='back-button' onClick={backPage}>Voltar</button>
    </div>
  );
}

export default UsersList;
