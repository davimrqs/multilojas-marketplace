import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function StorePage() {
  const { id } = useParams(); // Pega o ID da loja pela URL (ex: /loja/1)
  const [storeData, setStoreData] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('');

  // 1. Puxa os dados da API pública do Django que criamos
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/loja/${id}/produtos/?ordenacao=${sortOrder}`)
      .then(res => res.json())
      .then(data => {
        setStoreData(data.loja);
        setProducts(data.produtos);
      })
      .catch(err => console.error("Erro ao buscar dados da loja:", err));
  }, [id, sortOrder]);

  if (!storeData) return <div style={{ padding: '20px' }}>Carregando Loja...</div>;

  // URL da própria página para os botões de compartilhamento
  const currentUrl = window.location.href;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* CABEÇALHO DA LOJA */}
      <div style={{ borderBottom: '2px solid #eee', paddingBottom: '20px', marginBottom: '20px' }}>
        <h1>🏪 {storeData.nome_loja}</h1>
        <p>{storeData.descricao_loja || "Nenhuma descrição informada."}</p>
        <small style={{ color: '#666' }}>Dono da Loja: @{storeData.username_vendedor}</small>

        {/* BOTÕES DE COMPARTILHAMENTO */}
        <div style={{ marginTop: '15px' }}>
          <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Compartilhar loja:</span>
          <a href={`https://api.whatsapp.com/send?text=Confira essa loja: ${currentUrl}`} target="_blank" rel="noreferrer" style={{ marginRight: '10px', color: '#25D366', textDecoration: 'none' }}>WhatsApp</a>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`} target="_blank" rel="noreferrer" style={{ color: '#1877F2', textDecoration: 'none' }}>Facebook</a>
        </div>
      </div>

      {/* FILTROS E ORDENAÇÃO */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '15px', alignItems: 'center' }}>
        <label htmlFor="sort">Ordenar por preço:</label>
        <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '5px' }}>
          <option value="">Padrão</option>
          <option value="preco_asc">Menor Preço</option>
          <option value="preco_desc">Maior Preço</option>
        </select>
      </div>

      {/* GRID DE PRODUTOS */}
      <h2>Produtos Disponíveis</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px', marginTop: '15px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
            {product.imagem ? (
              <img src={`http://127.0.0.1:8000${product.imagem}`} alt={product.nome} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
            ) : (
              <div style={{ width: '100%', height: '150px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>Sem Imagem</div>
            )}
            <h3 style={{ fontSize: '18px', margin: '10px 0' }}>{product.nome}</h3>
            <p style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '16px' }}>R$ {product.preco}</p>
            <a href={`/produto/${product.id}`} style={{ display: 'inline-block', marginTop: '10px', padding: '8px 12px', backgroundColor: '#3498db', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>Ver Detalhes</a>
          </div>
        ))}
      </div>
    </div>
  );
}