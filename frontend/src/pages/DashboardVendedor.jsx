import { useEffect, useState } from 'react';
import api from '../services/api';

export default function DashboardVendedor() {
  const [meusProdutos, setMeusProdutos] = useState([]);

  useEffect(() => {
    // Busca apenas os produtos do usuário logado
    api.get('meus-produtos/')
      .then(response => setMeusProdutos(response.data))
      .catch(err => console.error("Erro ao carregar seus produtos", err));
  }, []);

  const excluirProduto = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await api.delete(`produtos/${id}/`); // Precisamos criar essa rota no back!
        setMeusProdutos(meusProdutos.filter(p => p.id !== id));
        alert("Produto removido!");
      } catch (err) {
        alert("Erro ao excluir.");
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Meu Painel de Vendas</h1>
      <div className="grid gap-4">
        {meusProdutos.map(p => (
          <div key={p.id} className="flex justify-between items-center bg-white p-4 shadow rounded">
            <div>
              <p className="font-bold">{p.nome}</p>
              <p className="text-sm text-gray-500">Preço: R$ {p.preco} | Estoque: {p.estoque}</p>
            </div>
            <button 
              onClick={() => excluirProduto(p.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}