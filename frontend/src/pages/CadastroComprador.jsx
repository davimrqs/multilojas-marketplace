import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CadastroComprador() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    telefone: '',
    cpf: '',
    endereco_completo: '',
    cep_destino: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          telefone: formData.telefone
        },
        cpf: formData.cpf,
        endereco_completo: formData.endereco_completo,
        cep_destino: formData.cep_destino
      };

      await api.post('cadastro/comprador/', payload);
      alert('Cadastro realizado com sucesso! Bem-vindo(a).');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Erro no cadastro. Verifique se o CPF ou Usuário já existem.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Cadastro de Cliente</h2>
        
        <div className="space-y-4">
          <input className="w-full p-2 border rounded" placeholder="Usuário" required
            onChange={e => setFormData({...formData, username: e.target.value})} />
          
          <input className="w-full p-2 border rounded" type="email" placeholder="E-mail" required
            onChange={e => setFormData({...formData, email: e.target.value})} />
          
          <input className="w-full p-2 border rounded" type="password" placeholder="Senha" required
            onChange={e => setFormData({...formData, password: e.target.value})} />
          
          <hr className="my-4"/>
          
          <input className="w-full p-2 border rounded" placeholder="CPF (apenas números)" required
            onChange={e => setFormData({...formData, cpf: e.target.value})} />
          
          <input className="w-full p-2 border rounded" placeholder="Endereço Completo" required
            onChange={e => setFormData({...formData, endereco_completo: e.target.value})} />

          <input className="w-full p-2 border rounded" placeholder="CEP de Entrega" required
            onChange={e => setFormData({...formData, cep_destino: e.target.value})} />
        </div>

        <button type="submit" className="w-full mt-6 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
          Finalizar Cadastro
        </button>
      </form>
    </div>
  );
}