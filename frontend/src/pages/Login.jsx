import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('login/', formData);
      // Salva os tokens no navegador
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      alert('Login realizado com sucesso!');
      navigate('/');
    } catch (error) {
      alert('Usuário ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Entrar no Marketplace</h2>
        <div className="space-y-4">
          <input className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Usuário" required onChange={e => setFormData({...formData, username: e.target.value})} />
          <input className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            type="password" placeholder="Senha" required onChange={e => setFormData({...formData, password: e.target.value})} />
        </div>
        <button type="submit" className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all">
          Acessar Conta
        </button>
      </form>
    </div>
  );
}