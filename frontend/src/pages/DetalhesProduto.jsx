import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState(null);
  const [erro, setErro] = useState(false);

  // Estados dos novos recursos visuais da Sprint 7
  const [imagemAtiva, setImagemAtiva] = useState('');
  const [tamanhoSel, setTamanhoSel] = useState('');
  const [corSel, setCorSel] = useState('');
  const [cep, setCep] = useState('');
  const [freteResultado, setFreteResultado] = useState(null);

  useEffect(() => {
    api.get(`produtos/${id}/`)
      .then(response => {
        setProduto(response.data);
        // Define a imagem principal inicial vinda da API
        if (response.data.imagem) {
          setImagemAtiva(response.data.imagem);
        }
      })
      .catch(err => {
        console.error(err);
        setErro(true);
      });
  }, [id]);

  // Função fictícia de cálculo de frete pedida na Sprint 7
  const handleCalcularFrete = (e) => {
    e.preventDefault();
    if (cep.replace(/\D/g, '').length >= 8) {
      setFreteResultado({ valor: "15.90", prazo: "4 dias úteis" });
    } else {
      alert("Digite um CEP válido.");
    }
  };

  // Lógica de adicionar ao carrinho combinando dados reais + variações estéticas
  const adicionarAoCarrinho = () => {
    if (!tamanhoSel || !corSel) {
      alert("Por favor, selecione as variações de Tamanho e Cor!");
      return;
    }

    const carrinhoAtual = JSON.parse(localStorage.getItem('carrinho') || '[]');
    const novoItem = {
      id: `${produto.id}-${tamanhoSel}-${corSel}`,
      nome: `${produto.nome} (${tamanhoSel} / ${corSel})`,
      preco: produto.preco,
      imagem: produto.imagem,
      quantidade: 1
    };

    localStorage.setItem('carrinho', JSON.stringify([...carrinhoAtual, novoItem]));
    alert("Produto adicionado ao carrinho!");
    navigate('/carrinho');
  };

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

  // Mocks estéticos da Sprint 7 para preencher o layout enquanto o back não tem esses campos
  const miniaturasMock = produto.imagem ? [produto.imagem, produto.imagem, produto.imagem] : [];
  const variacoesMock = { tamanhos: ["P", "M", "G", "GG"], cores: ["Padrão", "Preto", "Branco"] };
  const avaliacoesMock = [
    { id: 1, usuario: "Guilherme S.", estrelas: 5, comentario: "Produto muito bom, idêntico à descrição. Chegou super rápido!" },
    { id: 2, usuario: "Ana K.", estrelas: 4, comentario: "Qualidade excelente, recomendo a loja." }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 hover:text-blue-600 font-medium flex items-center gap-2">
        ← Voltar
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 md:p-8 grid md:grid-cols-2 gap-10">
        
        {/* LADO ESQUERDO: Galeria de Fotos (Sprint 7) */}
        <div className="space-y-4">
          <div className="w-full h-[450px] bg-gray-50 rounded-xl overflow-hidden border flex items-center justify-center">
            {imagemAtiva ? (
              <img src={imagemAtiva} alt={produto.nome} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-400">Esse produto não possui imagem.</span>
            )}
          </div>
          
          {/* Carrossel de Miniaturas */}
          {miniaturasMock.length > 0 && (
            <div className="flex gap-2 overflow-x-auto py-1">
              {miniaturasMock.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setImagemAtiva(img)}
                  className={`w-20 h-20 border-2 rounded-lg overflow-hidden flex-shrink-0 bg-white transition-all ${imagemAtiva === img ? 'border-blue-600 scale-95' : 'border-gray-200 opacity-70'}`}
                >
                  <img src={img} alt={`Miniatura ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LADO DIREITO: Informações Reais da API + Seletores Dinâmicos */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
              Loja: {produto.vendedor_nome || 'Marketplace'}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">{produto.nome}</h1>
            <p className="text-gray-600 text-sm leading-relaxed">{produto.descricao}</p>
          </div>

          <div className="border-t border-gray-100 pt-4 space-y-4">
            
            {/* Variações Exigidas na Sprint 7 */}
            <div className="space-y-3">
              <div>
                <span className="block text-xs font-bold text-gray-500 uppercase">Tamanho:</span>
                <div className="flex gap-2 mt-1">
                  {variacoesMock.tamanhos.map(t => (
                    <button key={t} onClick={() => setTamanhoSel(t)} className={`px-3 py-1.5 border rounded-lg text-xs font-semibold ${tamanhoSel === t ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <span className="block text-xs font-bold text-gray-500 uppercase">Cor:</span>
                <div className="flex gap-2 mt-1">
                  {variacoesMock.cores.map(c => (
                    <button key={c} onClick={() => setCorSel(c)} className={`px-3 py-1.5 border rounded-lg text-xs font-semibold ${corSel === c ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preço e Estoque Reais da API */}
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-gray-500 text-sm">Preço:</span>
              <span className="text-3xl font-black text-green-600">R$ {Number(produto.preco).toFixed(2)}</span>
            </div>

            <p className="text-xs font-medium text-gray-500">
              Disponibilidade: {' '}
              <span className={produto.estoque > 0 ? 'text-green-600' : 'text-red-500'}>
                {produto.estoque > 0 ? `${produto.estoque} unidades em estoque` : 'Esgotado'}
              </span>
            </p>

            {/* Botão de Compra */}
            <button 
              onClick={adicionarAoCarrinho}
              disabled={produto.estoque <= 0}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all text-sm ${produto.estoque > 0 ? 'bg-blue-600 hover:bg-blue-700 shadow-md' : 'bg-gray-300 cursor-not-allowed'}`}
            >
              {produto.estoque > 0 ? '🛒 Adicionar ao Carrinho' : 'Indisponível'}
            </button>

            {/* Cálculo de Frete (Sprint 7) */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mt-4">
              <span className="block text-xs font-bold text-gray-500 uppercase mb-2">Calcular Frete</span>
              <form onSubmit={handleCalcularFrete} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Ex: 01001-000" 
                  maxLength={9}
                  value={cep}
                  onChange={e => setCep(e.target.value)}
                  className="border border-gray-300 bg-white rounded-lg px-3 py-1.5 text-xs outline-none flex-grow"
                />
                <button type="submit" className="bg-gray-800 text-white text-xs font-bold px-4 py-1.5 rounded-lg hover:bg-gray-700 transition">Calcular</button>
              </form>
              {freteResultado && (
                <p className="text-xs text-gray-700 font-medium mt-3 p-2 bg-white rounded border border-gray-100">
                  🚚 Entrega Padrão: <span className="text-green-600 font-bold">R$ {freteResultado.valor}</span> (Prazo de {freteResultado.prazo})
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* SEÇÃO DE AVALIAÇÕES: Estrelas e Comentários (Sprint 7) */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Avaliações deste Produto</h2>
        <div className="space-y-4">
          {avaliacoesMock.map(av => (
            <div key={av.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-gray-800 text-sm">{av.usuario}</span>
                <span className="text-yellow-500 font-bold text-sm">{"★".repeat(av.estrelas)}</span>
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">{av.comentario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}