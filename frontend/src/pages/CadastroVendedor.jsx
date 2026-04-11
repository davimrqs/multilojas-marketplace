import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CadastroVendedor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    nome_loja: '',
    chave_pix: '',
    cep_origem: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password
        },
        nome_loja: formData.nome_loja,
        chave_pix: formData.chave_pix,
        cep_origem: formData.cep_origem
      };

      await api.post('cadastro/vendedor/', payload);
      alert('Loja cadastrada com sucesso! Agora faça login.');
      navigate('/login'); // Redireciona para o login após sucesso
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar. Verifique se o usuário já existe.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Cadastro de Vendedor</h2>
        
        <div className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Usuário" required
            onChange={e => setFormData({...formData, username: e.target.value})} />
          
          <input className="w-full p-2 border rounded" type="email" placeholder="E-mail" required
            onChange={e => setFormData({...formData, email: e.target.value})} />
          
          <input className="w-full p-2 border rounded" type="password" placeholder="Senha" required
            onChange={e => setFormData({...formData, password: e.target.value})} />
          
          <hr className="my-4"/>
          
          <input className="w-full p-2 border rounded" placeholder="Nome da Loja" required
            onChange={e => setFormData({...formData, nome_loja: e.target.value})} />
          
          <input className="w-full p-2 border rounded" placeholder="Chave PIX" required
            onChange={e => setFormData({...formData, chave_pix: e.target.value})} />

          <input className="w-full p-2 border rounded" placeholder="CEP de Origem" required
            onChange={e => setFormData({...formData, cep_origem: e.target.value})} />
        </div>

        <button type="submit" className="w-full mt-6 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
          Criar Minha Loja
        </button>
      </form>
    </div>
  );
}