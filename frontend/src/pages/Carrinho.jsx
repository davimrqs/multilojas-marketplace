import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import api from '../services/api';

export default function Carrinho() {
  const navigate = useNavigate();
  const [itens, setItens] = useState([]);
  const [cep, setCep] = useState('');
  const [valorFrete, setValorFrete] = useState(null);
  const [opcaoFrete, setOpcaoFrete] = useState('');

  useEffect(() => {
    const carrinhoSalvo = JSON.parse(localStorage.getItem('carrinho')) || [];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItens(carrinhoSalvo);
  }, []);

  const subtotal = itens.reduce((acc, item) => acc + (item.preco * (item.quantidade || 1)), 0);
  const total = subtotal + (valorFrete || 0);

  const alterarQuantidade = (id, novaQtd) => {
    if (novaQtd < 1) return;
    const novosItens = itens.map(item => item.id === id ? { ...item, quantidade: novaQtd } : item);
    setItens(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const removerItem = (id) => {
    const novosItens = itens.filter(item => item.id !== id);
    setItens(novosItens);
    localStorage.setItem('carrinho', JSON.stringify(novosItens));
  };

  const calcularFrete = () => {
    if (!cep || cep.length < 8) {
      alert('Digite um CEP válido com 8 dígitos.');
      return;
    }
    setValorFrete(15.00); 
    setOpcaoFrete('Normal');
  };

  const finalizarCompra = async () => {
    if (itens.length === 0) return alert('Seu carrinho está vazio!');
    if (!opcaoFrete) return alert('Por favor, calcule e selecione o frete.');

    // --- MODO TESTE: Simulando sucesso do servidor ---
    console.log("Simulando envio dos dados:", {
        valor_frete: valorFrete,
        opcao_frete: opcaoFrete,
        total: total,
        itens: itens
    });

    // Simula uma resposta 201 do backend
    const mockResponseData = {
        id: 9999,
        status: "pendente",
        total: total
    };

    alert('Modo Teste: Pedido simulado com sucesso!');
    localStorage.removeItem('carrinho');
    
    // Navegação para testar a tela seguinte
    navigate('/finalizar-pedido', { 
        state: { pedidoData: mockResponseData } 
    });
    // --- FIM DO MODO TESTE ---
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-6">
      <h1 className="text-3xl font-black text-gray-900 mb-8">🛒 Seu Carrinho</h1>

      {itens.length === 0 ? (
        <div className="text-center p-12 bg-white rounded-2xl border border-dashed">
          <p className="text-gray-500 mb-4">Seu carrinho está vazio.</p>
          <button onClick={() => navigate('/loja')} className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold">
            Ir para a Loja
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {itens.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl border flex items-center justify-between shadow-sm">
                <div>
                  <h3 className="font-bold text-gray-800">{item.nome}</h3>
                  <p className="text-xs text-blue-600 font-semibold">R$ {item.preco}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button onClick={() => alterarQuantidade(item.id, (item.quantidade || 1) - 1)} className="px-2 py-1">-</button>
                    <span className="px-3">{item.quantidade || 1}</span>
                    <button onClick={() => alterarQuantidade(item.id, (item.quantidade || 1) + 1)} className="px-2 py-1">+</button>
                  </div>
                  <button onClick={() => removerItem(item.id)} className="text-red-500 text-xs">Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border shadow-sm h-fit">
            <h2 className="font-black text-gray-900 mb-4">Resumo do Pedido</h2>
            <div className="space-y-4">
                <input 
                    type="text" 
                    placeholder="CEP" 
                    maxLength="8"
                    value={cep}
                    onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                    className="border p-2 rounded-lg w-full"
                />
                <button onClick={calcularFrete} className="bg-gray-900 text-white w-full py-2 rounded-lg text-xs font-bold">Calcular Frete</button>
                
                <div className="border-t pt-4">
                    <p>Total: R$ {total.toFixed(2)}</p>
                </div>

                <button 
                  onClick={finalizarCompra}
                  className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700"
                >
                  🚀 Finalizar Compra e Gerar Pedido
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}