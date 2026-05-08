import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CadastroProduto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    estoque: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // O vendedor não precisa mais ser enviado, o Token no header já diz quem ele é!
      await api.post('produtos/', formData);
      alert('Produto cadastrado com sucesso!');
      navigate('/dashboard'); 
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. Certifique-se de que sua conta de Vendedor está ativa.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">Novo Anúncio</h2>
        
        <div className="space-y-4">
          <input className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Nome do Produto" required 
            onChange={e => setFormData({...formData, nome: e.target.value})} />
          
          <textarea className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 h-32" 
            placeholder="Descrição" required 
            onChange={e => setFormData({...formData, descricao: e.target.value})} />
          
          <div className="flex gap-4">
            <input className="w-1/2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
              type="number" step="0.01" placeholder="Preço (R$)" required 
              onChange={e => setFormData({...formData, preco: e.target.value})} />
            
            <input className="w-1/2 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" 
              type="number" placeholder="Estoque" required 
              onChange={e => setFormData({...formData, estoque: e.target.value})} />
          </div>
        </div>

        <button type="submit" className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all">
          Publicar Produto
        </button>
      </form>
    </div>
  );
}