import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const INFO_LOJA = {
  nome: "Tech & Modas Marketplace",
  descricao: "As melhores marcas de eletrônicos, vestuário e acessórios em um só lugar com entrega rápida.",
  email: "contato@techmodas.com",
  whatsapp: "+55 (11) 99999-9999",
  instagram: "@techmodas_oficial"
};

// Produtos reserva caso o banco de dados local esteja vazio durante a demo
const PRODUTOS_RESERVA = [
  { id: 1, nome: "Camiseta Streetwear Oversized", preco: 89.90, categoria: "Vestuário", imagem: "https://via.placeholder.com/300x350" },
  { id: 2, nome: "Fone de Ouvido Bluetooth Pro", preco: 249.90, categoria: "Eletrônicos", imagem: "https://via.placeholder.com/300x350" },
  { id: 3, nome: "Tênis Running Casual", preco: 199.99, categoria: "Calçados", imagem: "https://via.placeholder.com/300x350" }
];

export default function Loja() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');
  const [ordenacao, setOrdenacao] = useState('padrao');
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    api.get('/produtos')
      .then(response => {
        // Se a API retornar dados vazios, usamos o mockup para visualização
        if (response.data && response.data.length > 0) {
          setProdutos(response.data);
        } else {
          setProdutos(PRODUTOS_RESERVA);
        }
      })
      .catch(err => {
        console.error("Erro ao carregar produtos da API, usando dados locais para a demo:", err);
        setProdutos(PRODUTOS_RESERVA);
      })
      .finally(() => setLoading(false));
  }, []);

  // Lógica de Filtros por Categoria (Trata tanto a propriedade categoria quanto tags se houver)
  const produtosFiltrados = categoriaAtiva === 'Todos' 
    ? produtos 
    : produtos.filter(p => (p.categoria || "Geral").toLowerCase() === categoriaAtiva.toLowerCase());

  // Ordenação
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    if (ordenacao === 'menor-preco') return Number(a.preco) - Number(b.preco);
    if (ordenacao === 'maior-preco') return Number(b.preco) - Number(a.preco);
    return 0;
  });

  const urlCompartilhar = window.location.href;

  if (loading) return <div className="text-center py-12 text-gray-500">Carregando vitrine da loja...</div>;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Cabeçalho Perfil da Loja */}
      <div className="bg-white border-b border-gray-200 py-8 px-6 mb-8 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{INFO_LOJA.nome}</h1>
            <p className="text-gray-600 max-w-xl text-sm">{INFO_LOJA.descricao}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs text-gray-500 font-medium">
              <span>📧 {INFO_LOJA.email}</span>
              <span>💬 WhatsApp: {INFO_LOJA.whatsapp}</span>
            </div>
          </div>
          
          {/* Botões de Compartilhamento Compartilhar */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Compartilhar Loja:</span>
            <div className="flex gap-2">
              <a href={`https://api.whatsapp.com/send?text=Confira essa loja: ${urlCompartilhar}`} target="_blank" rel="noreferrer" className="bg-green-500 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-green-600 transition">
                WhatsApp
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${urlCompartilhar}`} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-blue-700 transition">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filtros Laterais */}
        <aside className="space-y-6">
          <div>
            <h3 className="font-bold text-gray-800 mb-3 text-lg">Categorias</h3>
            <div className="flex flex-col gap-1">
              {['Todos', 'Eletrônicos', 'Vestuário', 'Calçados'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategoriaAtiva(cat); setPagina(1); }}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${categoriaAtiva === cat ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid de Produtos principal */}
        <div className="md:col-span-3 space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200">
            <p className="text-sm text-gray-500 font-medium">Mostrando <span className="text-gray-800">{produtosOrdenados.length}</span> produtos</p>
            <select 
              value={ordenacao} 
              onChange={(e) => setOrdenacao(e.target.value)}
              className="border border-gray-300 rounded-lg p-1.5 text-sm outline-none text-gray-700"
            >
              <option value="padrao">Ordenar por: Padrão</option>
              <option value="menor-preco">Preço: Menor para Maior</option>
              <option value="maior-preco">Preço: Maior para Menor</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtosOrdenados.map((p) => (
              <div key={p.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <img src={p.imagem || p.imagem_url || "https://via.placeholder.com/300x350"} alt={p.nome} className="w-full h-64 object-cover bg-gray-100" />
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{p.categoria || "Geral"}</span>
                    <h4 className="font-bold text-gray-800 mt-1 mb-2 text-base line-clamp-1">{p.nome}</h4>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold text-gray-900">R$ {Number(p.preco).toFixed(2)}</span>
                    <Link to={`/produto/${p.id}`} className="bg-gray-900 text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-600 transition">
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Paginação Estética */}
          <div className="flex justify-center items-center gap-2 pt-6">
            <button onClick={() => setPagina(p => Math.max(p - 1, 1))} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white text-gray-600">Anterior</button>
            <button className={`px-4 py-2 rounded-lg text-sm font-bold ${pagina === 1 ? 'bg-blue-600 text-white' : 'bg-white border border-gray-300 text-gray-600'}`}>1</button>
            <button onClick={() => setPagina(p => p + 1)} className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium bg-white text-gray-600">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
}