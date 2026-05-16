import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function DashboardVendedor() {
  const [meusProdutos, setMeusProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/login');
      return;
    }

    api.get('meus-produtos/')
      .then(response => setMeusProdutos(response.data))
      .catch(err => {
        console.error("Erro ao carregar produtos", err);
        if (err.response?.status === 401) navigate('/login');
      });
  }, [navigate]);

  const excluirProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`produtos/${id}/`);
        setMeusProdutos(meusProdutos.filter(p => p.id !== id));
        alert("Produto removido!");
      } catch (err) {
        alert("Erro ao excluir.");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Cabeçalho com Contador de Itens */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Meu Painel de Vendas</h1>
          <p className="text-gray-500 text-sm">Gerencie seus anúncios e estoque</p>
        </div>
        <div className="text-center bg-blue-50 p-4 rounded-lg border border-blue-100">
          <span className="block text-2xl font-bold text-blue-600">{meusProdutos.length}</span>
          <span className="text-xs text-blue-800 font-medium uppercase tracking-wider">Itens no Marketplace</span>
        </div>
      </div>

      {meusProdutos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border">
          <p className="text-gray-500">Você ainda não tem produtos cadastrados.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {meusProdutos.map(p => (
            <div key={p.id} className="flex justify-between items-center bg-white p-4 shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition">
              {/* Foto + Informações do Produto */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border flex items-center justify-center flex-shrink-0">
                  {p.imagem ? (
                    <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xs text-gray-400">Sem foto</span>
                  )}
                </div>
                <div>
                  <p className="font-bold text-lg text-gray-800">{p.nome}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    Preço: <span className="text-green-600 font-semibold">R$ {p.preco}</span>
                  </p>
                  {/* Badge de Estoque */}
                  <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded ${
                    p.estoque > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    Estoque: {p.estoque} un
                  </span>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate(`/produto/${p.id}`)}
                  className="text-gray-600 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                >
                  Ver Detalhes
                </button>
                <button 
                  onClick={() => excluirProduto(p.id)}
                  className="bg-red-50 text-red-600 border border-red-100 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}