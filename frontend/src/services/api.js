import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

// Adicione isso para testar o front SEM bater no Django:
api.post = async (url, data) => {
  console.log("API Mock interceptou o POST para:", url, data);
  
  // Retorna uma promessa que resolve com um sucesso falso
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
        data: { id: 123, status: "pendente", total: data.total }
      });
    }, 1000); // Atraso de 1 segundo para simular rede
  });
};

export default api;