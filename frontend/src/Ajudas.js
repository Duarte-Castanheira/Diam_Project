import React, { useState } from 'react';
import axios from 'axios';

import './stylesListings.css';

function CreateListings() {
  const [formDataCarro, setFormDataCarro] = useState({
    marca: '',
    modelo: '',
    ano: '',
    cor: '',
    quilometragem: '',
    combustivel: '',
    potencia: '',
    portas: '',
    transmissao: '',
  });

  const [formDataListing, setFormDataListing] = useState({
    titulo: '',
    descricao: '',
    preco: '',
    imagens: [], // Agora é array
    idcarro: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const API_BASE_URL = 'http://localhost:8000';

  function getCSRFToken() {
    return document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
  }

  const handleListingChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagens') {
      setFormDataListing({ ...formDataListing, imagens: Array.from(files) }); // Guarda várias imagens
    } else {
      setFormDataListing({ ...formDataListing, [name]: value });
    }
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setFormDataCarro({ ...formDataCarro, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (localStorage.getItem('loginCompleted') !== 'true') {
      setErrorMessage('Você precisa estar autenticado para criar um anúncio!');
      return;
    }

    try {
      // Criação do veículo
      const vehicleResponse = await axios.post(`${API_BASE_URL}/vehicle/api/vehicles/create/`, formDataCarro, {
        headers: { 'X-CSRFToken': getCSRFToken() },
        withCredentials: true
      });

      setFormDataCarro({
        marca: '',
        modelo: '',
        ano: '',
        cor: '',
        quilometragem: '',
        combustivel: '',
        potencia: '',
        portas: '',
        transmissao: '',
      });

      // Criação do anúncio com múltiplas imagens
      const formData = new FormData();
      formData.append('titulo', formDataListing.titulo);
      formData.append('descricao', formDataListing.descricao);
      formData.append('preco', formDataListing.preco);
      formData.append('idcarro', vehicleResponse.data.id);

      // Adicionar todas as imagens
      formDataListing.imagens.forEach(imagem => {
        formData.append('imagens', imagem); // ou 'imagens[]' se o backend pedir assim
      });

      await axios.post(`${API_BASE_URL}/listing/api/listings/create/`, formData, {
        headers: {
          'X-CSRFToken': getCSRFToken(),
        },
        withCredentials: true
      });

      setFormDataListing({
        titulo: '',
        descricao: '',
        preco: '',
        imagens: [],
        idcarro: '',
      });

      setSuccessMessage('Anúncio criado com sucesso!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Erro ao criar anúncio, verifique os dados.');
    }
  };

  return (
    <div className="create-listing-container">
      <main>
        <h1>Crie o seu Anúncio</h1>
        <form onSubmit={handleSubmit} className="create-listing-form">

          <h2>Informações do Veículo</h2>
          <input type="text" name="marca" value={formDataCarro.marca} onChange={handleVehicleChange} placeholder="Marca" required />
          <input type="text" name="modelo" value={formDataCarro.modelo} onChange={handleVehicleChange} placeholder="Modelo" required />
          <input type="number" name="ano" value={formDataCarro.ano} onChange={handleVehicleChange} placeholder="Ano" required />
          <input type="text" name="cor" value={formDataCarro.cor} onChange={handleVehicleChange} placeholder="Cor" required />
          <input type="number" name="quilometragem" value={formDataCarro.quilometragem} onChange={handleVehicleChange} placeholder="Quilometragem" required />
          <input type="text" name="combustivel" value={formDataCarro.combustivel} onChange={handleVehicleChange} placeholder="Combustível" required />
          <input type="number" name="potencia" value={formDataCarro.potencia} onChange={handleVehicleChange} placeholder="Potência (cv)" required />
          <input type="number" name="portas" value={formDataCarro.portas} onChange={handleVehicleChange} placeholder="Número de portas" required />
          <input type="text" name="transmissao" value={formDataCarro.transmissao} onChange={handleVehicleChange} placeholder="Transmissão" required />

          <h2>Informações do Anúncio</h2>
          <input type="text" name="titulo" value={formDataListing.titulo} onChange={handleListingChange} placeholder="Título do anúncio" required />
          <textarea name="descricao" value={formDataListing.descricao} onChange={handleListingChange} placeholder="Descrição" rows="4" required />
          <input type="number" name="preco" value={formDataListing.preco} onChange={handleListingChange} placeholder="Preço (€)" required />
          <input type="file" name="imagens" accept="image/*" multiple onChange={handleListingChange} />

          <button type="submit">Criar Anúncio</button>

          {successMessage && <p className="success">{successMessage}</p>}
          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      </main>
    </div>
  );
}

export default CreateListings;