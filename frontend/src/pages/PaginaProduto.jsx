import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
  const { id } = useParams(); // Pega o ID do produto pela URL (ex: /produto/3)
  const [product, setProduct] = useState(null);
  const [cep, setCep] = useState('');
  const [shippingPrice, setShippingPrice] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/produto/${id}/`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.error("Erro ao buscar produto:", err));
  }, [id]);

  if (!product) return <div style={{ padding: '20px' }}>Carregando Produto...</div>;

  // Função provisória para simular o cálculo do Frete (Será melhorado na Sprint 8)
  const handleCalculateShipping = (e) => {
    e.preventDefault();
    if (cep.length === 8) {
      setShippingPrice(15.90); // Simulação de valor fixo por enquanto
    } else {
      alert("Digite um CEP válido com 8 dígitos.");
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '1000px', margin: '0 auto' }}>
      {/* COLUNA DA ESQUERDA: FOTO */}
      <div style={{ flex: '1', minWidth: '300px' }}>
        {product.imagem ? (
          <img src={`http://127.0.0.1:8000${product.imagem}`} alt={product.nome} style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '8px' }} />
        ) : (
          <div style={{ width: '100%', height: '300px', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>Sem Imagem</div>
        )}
      </div>

      {/* COLUNA DA DIREITA: INFORMAÇÕES */}
      <div style={{ flex: '1', minWidth: '300px', padding: '0 20px' }}>
        <small style={{ color: '#999', textTransform: 'uppercase' }}>Loja: {product.loja?.nome_loja}</small>
        <h1 style={{ margin: '10px 0 20px 0' }}>{product.nome}</h1>
        
        <p style={{ fontSize: '24px', color: '#2ecc71', fontWeight: 'bold', margin: '0 0 20px 0' }}>R$ {product.preco}</p>
        
        <h3 style={{ margin: '0 0 10px 0' }}>Descrição</h3>
        <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '30px' }}>{product.descricao}</p>

        {/* BOTÃO ADICIONAR AO CARRINHO */}
        <button style={{ width: '100%', padding: '15px', backgroundColor: '#27ae60', color: '#fff', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginBottom: '30px' }} onClick={() => alert("Produto adicionado ao carrinho! (Lógica da Sprint 8)")}>
          🛒 Adicionar ao Carrinho
        </button>

        {/* CÁLCULO DE FRETE COMPLETO (REQUISITO DA SPRINT 7) */}
        <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '6px', backgroundColor: '#fafafa' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Calcular Frete e Prazo</h4>
          <form onSubmit={handleCalculateShipping} style={{ display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Digite seu CEP" value={cep} onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} maxLength="8" style={{ padding: '8px', flex: '1', border: '1px solid #ccc', borderRadius: '4px' }} />
            <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#34495e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Calcular</button>
          </form>
          {shippingPrice && (
            <p style={{ marginTop: '10px', color: '#333', fontWeight: 'bold' }}>🚚 Sedex: R$ {shippingPrice.toFixed(2)} (Prazo: 3 a 5 dias úteis)</p>
          )}
        </div>
      </div>
    </div>
  );
}