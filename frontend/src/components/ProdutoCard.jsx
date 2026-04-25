export default function ProdutoCard({ produto }) {
  // Se não tiver imagem, usamos uma placeholder
  const imagemUrl = produto.imagem || 'https://via.placeholder.com/150';

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <img src={imagemUrl} alt={produto.nome} className="w-full h-48 object-cover rounded-md" />
      <h3 className="mt-2 text-lg font-bold text-gray-800">{produto.nome}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{produto.descricao}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-green-600">R$ {produto.preco}</span>
        <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
          Ver detalhes
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">Loja: {produto.vendedor_nome}</p>
    </div>
  );
}