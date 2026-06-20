import { useState } from 'react';
// Importação direta de um array simples para não depender de arquivos externos agora
const mockPedidos = [
  { id: 1, comprador: "Matheus", status: "pendente", total: 150.00 },
  { id: 2, comprador: "Joao", status: "pago", total: 80.00 }
];

export default function PedidosVendedor() {
  const [pedidos, setPedidos] = useState(mockPedidos);
  const [statusAtivo, setStatusAtivo] = useState('pendente');

  // A função que usa o setPedidos
  const aprovarPedido = (id) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, status: 'pago' } : p));
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Painel de Pedidos</h1>
      
      <div className="flex gap-4 mb-6">
        {['pendente', 'pago'].map(status => (
          <button 
            key={status}
            onClick={() => setStatusAtivo(status)}
            className={`px-4 py-2 rounded ${statusAtivo === status ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {pedidos.filter(p => p.status === statusAtivo).map(pedido => (
          <div key={pedido.id} className="border p-4 rounded-lg bg-white shadow">
            <p className="font-bold">Pedido #{pedido.id} - {pedido.comprador}</p>
            <p>Total: R$ {pedido.total.toFixed(2)}</p>
            {pedido.status === 'pendente' && (
              <button 
                onClick={() => aprovarPedido(pedido.id)}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              >
                Aprovar Pedido
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}