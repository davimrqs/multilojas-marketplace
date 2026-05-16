import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import api from '../services/api';

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Busca todos os produtos do marketplace para os clientes verem
    api.get('produtos/')
      .then(response => setProdutos(response.data))
      .catch(err => console.error("Erro ao carregar vitrine", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Vitrine de Produtos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            
            {/* Imagem do Produto */}
            <div className="w-full h-48 bg-gray-50 flex items-center justify-center border-b">
              {p.imagem ? (
                <img src={p.imagem} alt={p.nome} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-sm">Sem foto</span>
              )}
            </div>

            {/* Informações básicas */}
            <div className="p-4 flex-grow">
              <h2 className="font-bold text-lg text-gray-800 line-clamp-1">{p.nome}</h2>
              <p className="text-green-600 font-bold mt-1">R$ {p.preco}</p>
              <p className="text-xs text-gray-400 mt-2">Estoque disponível: {p.estoque} un</p>
            </div>

            {/* Botão para abrir a tela de Detalhes */}
            <div className="p-4 pt-0">
              <button 
                onClick={() => navigate(`/produto/${p.id}`)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 rounded-lg transition"
              >
                Ver Detalhes
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}