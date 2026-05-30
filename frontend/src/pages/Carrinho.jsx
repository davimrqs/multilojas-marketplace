import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Carrinho() {
  const navigate = useNavigate();

  // O estado já inicia buscando os dados do localStorage na montagem do componente.
  // Isso evita o uso do useEffect e resolve o erro de 'cascading renders' do seu linter.
  const [itens, setItens] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('carrinho') || '[]');
    } catch (error) {
      console.error("Erro ao carregar itens do carrinho:", error);
      return [];
    }
  });

  // Remove um item específico do carrinho
  const removerItem = (idParaRemover) => {
    const carrinhoAtualizado = itens.filter(item => item.id !== idParaRemover);
    setItens(carrinhoAtualizado);
    localStorage.setItem('carrinho', JSON.stringify(carrinhoAtualizado));
  };

  // Calcula o valor total somando (preço * quantidade) de cada item
  const precoTotal = itens.reduce((acumulador, item) => acumulador + (Number(item.preco) * item.quantidade), 0);

  // Renderização caso o carrinho não tenha produtos
  if (itens.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center py-20">
        <span className="text-6xl">🛒</span>
        <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Seu carrinho está vazio</h2>
        <p className="text-gray-500 mb-6 text-sm">Adicione produtos da vitrine para prosseguir com a compra.</p>
        <button 
          onClick={() => navigate('/loja')} 
          className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md"
        >
          Voltar para a Loja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Meu Carrinho</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Produtos Adicionados */}
        <div className="lg:col-span-2 space-y-4">
          {itens.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 p-4 rounded-xl flex gap-4 items-center justify-between shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 border">
                <img src={item.imagem || "https://via.placeholder.com/150"} alt={item.nome} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow min-w-0">
                <h4 className="font-bold text-gray-800 text-sm truncate">{item.nome}</h4>
                <span className="text-xs text-gray-400 block mt-0.5">Qtd: {item.quantidade}</span>
                <span className="text-sm font-extrabold text-green-600 block mt-1">R$ {Number(item.preco).toFixed(2)}</span>
              </div>

              <button 
                onClick={() => removerItem(item.id)} 
                className="text-gray-400 hover:text-red-500 font-medium text-xs p-2 transition flex items-center gap-1"
                title="Remover produto"
              >
                ❌ Remover
              </button>
            </div>
          ))}
        </div>

        {/* Resumo Financeiro do Pedido */}
        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm h-fit space-y-6">
          <h3 className="font-bold text-gray-800 text-lg border-b pb-3">Resumo</h3>
          
          <div className="flex justify-between items-baseline">
            <span className="text-gray-500 text-sm">Subtotal:</span>
            <span className="text-xl font-black text-gray-900">R$ {precoTotal.toFixed(2)}</span>
          </div>

          <div className="text-xs text-gray-400 leading-relaxed bg-gray-50 p-3 rounded-lg border">
            💡 Os dados de entrega e pagamento serão definidos na próxima etapa da finalização.
          </div>

          <button 
            onClick={() => alert('Compra finalizada com sucesso (Simulação da Sprint)!')}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-md text-sm"
          >
            Finalizar Compra
          </button>
          
          <button 
            onClick={() => navigate('/loja')} 
            className="w-full text-center text-xs text-gray-500 hover:text-blue-600 font-medium block"
          >
            ← Continuar Comprando
          </button>
        </div>
      </div>
    </div>
  );
}