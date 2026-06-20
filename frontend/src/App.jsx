import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Importação das páginas
import Home from './pages/Home.jsx';
import Loja from './pages/Loja.jsx'; 
import Login from './pages/Login.jsx';
import CadastroVendedor from './pages/CadastroVendedor.jsx';
import CadastroComprador from './pages/CadastroComprador.jsx';
import CadastroProduto from './pages/CadastroProduto.jsx';
import DashboardVendedor from './pages/DashboardVendedor.jsx'; 
import DetalhesProduto from './pages/DetalhesProduto.jsx';
import Carrinho from "./pages/Carrinho.jsx"; 
import FinalizarPedido from './pages/FinalizarPedido';
// A nova página que você criou:
import PedidosVendedor from './pages/PedidosVendedor.jsx'; 

function App() {
  const [logado, setLogado] = useState(() => !!localStorage.getItem('access'));

  useEffect(() => {
    const verificarStatus = () => {
      setLogado(!!localStorage.getItem('access'));
    };
    window.addEventListener('storage', verificarStatus);
    return () => window.removeEventListener('storage', verificarStatus);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setLogado(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4 flex gap-6 justify-center items-center border-b">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium text-sm">Home</Link>
          <Link to="/loja" className="text-gray-600 hover:text-blue-600 font-medium text-sm">Loja</Link>
          <Link to="/carrinho" className="text-amber-600 font-bold text-sm">🛒 Carrinho</Link>
          
          {!logado ? (
            <>
              <Link to="/cadastro-vendedor" className="text-blue-600 font-medium text-sm">Sou Vendedor</Link>
              <Link to="/cadastro-cliente" className="text-green-600 font-medium text-sm">Sou Cliente</Link>
              <Link to="/login" className="bg-gray-800 text-white px-4 py-1.5 rounded-xl text-xs font-medium">Entrar</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-blue-600 font-medium text-sm">Meu Painel</Link>
              <Link to="/pedidos-vendedor" className="text-purple-600 font-medium text-sm">Meus Pedidos</Link>
              <Link to="/novo-produto" className="text-green-600 font-medium text-sm">+ Anunciar</Link>
              <button 
                onClick={handleLogout} 
                className="text-red-500 font-medium text-sm border border-red-200 px-3 py-1 rounded-xl hover:bg-red-50 transition cursor-pointer"
              >
                Sair
              </button>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Loja />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro-vendedor" element={<CadastroVendedor />} />
          <Route path="/cadastro-cliente" element={<CadastroComprador />} />
          <Route path="/novo-produto" element={<CadastroProduto />} />
          <Route path="/dashboard" element={<DashboardVendedor />} />
          <Route path="/produto/:id" element={<DetalhesProduto />} />
          <Route path="/carrinho" element={<Carrinho />} /> 
          <Route path="/finalizar-pedido" element={<FinalizarPedido />} />
          <Route path="/pedidos-vendedor" element={<PedidosVendedor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;