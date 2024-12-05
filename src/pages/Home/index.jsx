import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'

import api from '../../services/api'

const Home = () => {
  const navigate = useNavigate(); // Hook para navegar entre as rotas
  const [, setClientes] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // Estado para a mensagem de sucesso
  const [isFormValid, setIsFormValid] = useState(false); // Novo estado para validar o formulário

  const inputName = useRef();
  const inputAddress = useRef();
  const inputHouseNumber = useRef();
  const inputZipCode = useRef();
  const inputPhoneNumber = useRef();
  const inputEmail = useRef();

  const goToPage = () => {
    navigate("/usuarios");
  }


  // Função para limpar os campos do formulário
  function clearFormFields() {
    inputName.current.value = '';
    inputAddress.current.value = '';
    inputHouseNumber.current.value = '';
    inputZipCode.current.value = '';
    inputPhoneNumber.current.value = '';
    inputEmail.current.value = '';

  }

   // Função para verificar se todos os campos estão preenchidos
   function validateForm() {
    const isValid = 
      inputName.current.value.trim() !== '' &&
      inputAddress.current.value.trim() !== '' &&
      inputHouseNumber.current.value.trim() !== '' &&
      inputZipCode.current.value.trim() !== '' &&
      inputPhoneNumber.current.value.trim() !== '' &&
      inputEmail.current.value.trim() !== '';

    setIsFormValid(isValid); // Atualiza o estado de validação do formulário
  }


  async function getClientes() {
  const clientesFromApi = await api.get('/clientes')

  setClientes(clientesFromApi.data)
  }

  async function createClientes() {
    try {
     await api.post('/clientes', {
      name: inputName.current.value,
      address: inputAddress.current.value,
      houseNumber: inputHouseNumber.current.value,
      zipCode: inputZipCode.current.value,
      phoneNumber: inputPhoneNumber.current.value,
      email: inputEmail.current.value
     });
  
      getClientes();
      clearFormFields();
      validateForm();

            // Define a mensagem de sucesso
            setSuccessMessage('Usuário cadastrado com sucesso!');
            setTimeout(() => setSuccessMessage(''), 3000); // Remove a mensagem após 3 segundos
          } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
          }
        }

  
    // Chama a função de validar o formulário sempre que qualquer campo for alterado
  useEffect(() => {
    getClientes()
  }, []);
  
  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Clientes</h1>
        {successMessage && <div className="success-message">{successMessage} </div>} {/* Exibe a mensagem */}
        <input placeholder="Nome" name="name" type="text" ref={inputName} onChange={validateForm} />
        <input placeholder="Endereço" name="address" type="text" ref={inputAddress} onChange={validateForm}  />
        <input placeholder="Número" name="houseNumber" type="number" ref={inputHouseNumber} onChange={validateForm}  />
        <input placeholder="Cep" name="zipCode" type="text" ref={inputZipCode} onChange={validateForm}  />
        <input placeholder="Telefone" name="phoneNumber" type="text" ref={inputPhoneNumber}onChange={validateForm}  />
        <input placeholder="Email" name="email" type="text" ref={inputEmail} onChange={validateForm}  />
        <button type="button" onClick={createClientes} disabled={!isFormValid}>Cadastrar</button> 
      </form>

      {/* Botão para ir para a página de usuários */}
         <button className='go-to-page' onClick={goToPage}>Clientes cadastrados</button>
    </div>
  );
}


export default Home
