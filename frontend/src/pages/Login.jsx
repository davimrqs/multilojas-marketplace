import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Tenta fazer o login no endpoint atual
      const response = await api.post('login/', formData);
      
      // Armazena as credenciais oficiais vindas do Django
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      
      alert('Login realizado com sucesso! 🎉');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
      
      if (error.response) {
        const status = error.response.status;
        
        if (status === 404) {
          alert('Erro 404: O endpoint "login/" não foi encontrado no Django. Verifique se o correto na sua API não é "token/" ou "api/token/".');
        } else if (status === 401 || status === 400) {
          alert('Usuário ou senha incorretos no banco de dados do Django. Garanta que a senha digitada é a mesma do cadastro.');
        } else {
          alert(`Erro do Django (${status}): ${JSON.stringify(error.response.data)}`);
        }
      } else {
        alert('Não foi possível conectar ao servidor Django. Verifique se o backend está rodando.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Entrar no Marketplace</h2>
        <div className="space-y-4">
          <input 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Usuário" 
            required 
            onChange={e => setFormData({...formData, username: e.target.value})} 
          />
          <input 
            className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            type="password" 
            placeholder="Senha" 
            required 
            onChange={e => setFormData({...formData, password: e.target.value})} 
          />
        </div>
        <button type="submit" className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all">
          Acessar Conta
        </button>
      </form>
    </div>
  );
}