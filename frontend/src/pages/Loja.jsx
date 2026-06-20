import { useEffect, useState } from 'react';
import api from '../services/api';

const PRODUTOS_RESERVA = [
  { id: 1, nome: "Camiseta Streetwear Oversized", preco: 89.90, imagem: "https://via.placeholder.com/300x350" },
  { id: 2, nome: "Fone de Ouvido Bluetooth Pro", preco: 249.90, imagem: "https://via.placeholder.com/300x350" }
];

export default function Loja() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/produtos')
      .then(response => {
        if (response.data && response.data.length > 0) {
          setProdutos(response.data);
        } else {
          setProdutos(PRODUTOS_RESERVA);
        }
      })
      .catch(() => {
        setProdutos(PRODUTOS_RESERVA);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // FUNÇÃO QUE ESTAVA FALTANDO PARA SALVAR NO LOCALSTORAGE
  const adicionarAoCarrinho = (produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const itemExistente = carrinhoAtual.find(item => item.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade = (itemExistente.quantidade || 1) + 1;
    } else {
      carrinhoAtual.push({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem: produto.imagem || "https://via.placeholder.com/300x350",
        quantidade: 1
      });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
    alert(`🛒 ${produto.nome} adicionado ao carrinho!`);
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Carregando...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-black mb-6">Nossos Produtos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {produtos.map(produto => (
          <div key={produto.id} className="bg-white border rounded-2xl p-4 shadow-sm flex flex-col justify-between">
            <div>
              <img src={produto.imagem} alt={produto.nome} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="font-bold text-gray-800">{produto.nome}</h3>
              <p className="text-green-600 font-extrabold mt-2">R$ {Number(produto.preco).toFixed(2)}</p>
            </div>
            
            {/* O BOTÃO QUE ESTAVA FALTANDO ENTRAR AQUI */}
            <button 
              onClick={() => adicionarAoCarrinho(produto)}
              className="w-full bg-blue-600 text-white text-xs py-2.5 rounded-xl font-bold hover:bg-blue-700 transition mt-4"
            >
              🛒 Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}