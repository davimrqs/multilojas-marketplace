import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o navigate
import api from '../services/api';

export default function DashboardVendedor() {
  const [meusProdutos, setMeusProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Proteção: Se não tem token, tchau!
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    // 2. Busca apenas os produtos do usuário logado
    api.get('meus-produtos/')
      .then(response => setMeusProdutos(response.data))
      .catch(err => {
        console.error("Erro ao carregar seus produtos", err);
        if(err.response?.status === 401) navigate('/login'); // Token expirado
      });
  }, [navigate]);

  const excluirProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`produtos/${id}/`);
        setMeusProdutos(meusProdutos.filter(p => p.id !== id));
        alert("Produto removido!");
      } catch (err) {
        alert("Erro ao excluir. Você tem permissão para isso?");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Meu Painel de Vendas</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">Vendedor Ativo</span>
      </div>

      {meusProdutos.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500">Você ainda não tem produtos cadastrados.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {meusProdutos.map(p => (
            <div key={p.id} className="flex justify-between items-center bg-white p-6 shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition">
              <div>
                <p className="font-bold text-lg text-gray-800">{p.nome}</p>
                <p className="text-sm text-gray-500">
                  Preço: <span className="text-green-600 font-semibold">R$ {p.preco}</span> | Estoque: {p.estoque} unidades
                </p>
              </div>
              <button 
                onClick={() => excluirProduto(p.id)}
                className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}