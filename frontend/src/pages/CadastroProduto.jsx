import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CadastroProduto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendedor: '', nome: '', descricao: '', preco: '', estoque: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Por enquanto passamos o ID do vendedor manualmente. 
      // Na Sprint 4, isso virá automático do login!
      await api.post('produtos/', formData);
      alert('Produto anunciado com sucesso!');
      navigate('/'); 
    } catch (error) {
      alert('Erro ao cadastrar produto. Verifique se o ID do vendedor está correto.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-600 text-center">Cadastrar Novo Produto</h2>
        <div className="grid grid-cols-1 gap-4">
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ID do Vendedor (veja no Admin)" required onChange={e => setFormData({...formData, vendedor: e.target.value})} />
          <input className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nome do Produto" required onChange={e => setFormData({...formData, nome: e.target.value})} />
          <textarea className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="Descrição detalhada do produto" required onChange={e => setFormData({...formData, descricao: e.target.value})} />
          <div className="flex gap-4">
            <input className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="number" step="0.01" placeholder="Preço (R$)" required onChange={e => setFormData({...formData, preco: e.target.value})} />
            <input className="w-1/2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" type="number" placeholder="Estoque inicial" required onChange={e => setFormData({...formData, estoque: e.target.value})} />
          </div>
        </div>
        <button type="submit" className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg">Anunciar Produto</button>
      </form>
    </div>
  );
}