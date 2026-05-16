import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function DetalhesProduto() {
  const { id } = useParams(); // Pega o ID do produto que veio pela URL
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    api.get(`produtos/${id}/`)
      .then(response => setProduto(response.data))
      .catch(err => {
        console.error(err);
        setErro(true);
      });
  }, [id]);

  if (erro) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-bold">Produto não encontrado ou erro no servidor.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-500 underline">Voltar</button>
      </div>
    );
  }

  if (!produto) {
    return <div className="text-center py-12 text-gray-500">Carregando detalhes do produto...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2">
        ← Voltar
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid md:grid-cols-2 gap-8">
        {/* Lado Esquerdo: Imagem Grande */}
        <div className="w-full h-96 bg-gray-50 rounded-xl overflow-hidden border flex items-center justify-center">
          {produto.imagem ? (
            <img src={produto.imagem} alt={produto.nome} className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400">Esse produto não possui imagem cadastrada.</span>
          )}
        </div>

        {/* Lado Direito: Informações e Compra */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
              Loja: {produto.vendedor_nome || 'Marketplace'}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">{produto.nome}</h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{produto.descricao}</p>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-gray-500 text-sm">Preço:</span>
              <span className="text-3xl font-black text-green-600">R$ {produto.preco}</span>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Disponibilidade: {' '}
              <span className={produto.estoque > 0 ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                {produto.estoque > 0 ? `${produto.estoque} unidades em estoque` : 'Esgotado'}
              </span>
            </p>

            <button 
              disabled={produto.estoque <= 0}
              className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
                produto.estoque > 0 
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-100' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {produto.estoque > 0 ? 'Adicionar ao Carrinho' : 'Indisponível'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}