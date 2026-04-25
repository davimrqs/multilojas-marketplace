import { useEffect, useState } from 'react';
import api from '../services/api';
import ProdutoCard from '../components/ProdutoCard';

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    // Busca os produtos no Django assim que a página carrega
    api.get('produtos/')
      .then(response => setProdutos(response.data))
      .catch(error => console.error("Erro ao carregar produtos:", error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Produtos em Destaque</h1>
      
      {produtos.length === 0 ? (
        <p className="text-gray-500">Nenhum produto cadastrado ainda...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {produtos.map(prod => (
            <ProdutoCard key={prod.id} produto={prod} />
          ))}
        </div>
      )}
    </div>
  );
}