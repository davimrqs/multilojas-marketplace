export const mockPedidos = [
  {
    id: 1,
    comprador: "matheus",
    total: 354.80,
    status: "pendente",
    itens: [{ nome: "Camiseta", qtd: 1 }, { nome: "Fone", qtd: 1 }],
    comprovante: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    comprador: "joao",
    total: 120.00,
    status: "pago",
    itens: [{ nome: "Tenis", qtd: 1 }],
    codigo_rastreio: null
  }
];