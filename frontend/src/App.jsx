import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


// Imports das suas páginas
import Home from './pages/Home';
import Login from './pages/Login';
import CadastroVendedor from './pages/CadastroVendedor';
import CadastroComprador from './pages/CadastroComprador';
import CadastroProduto from './pages/CadastroProduto';
import DashboardVendedor from './pages/DashboardVendedor'; 
import DetalhesProduto from './pages/DetalhesProduto';
import PaginaLoja from './pages/StorePage';
import PaginaProduto from './pages/ProductPage';

function App() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access');
    setLogado(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.setItem('access', ''); // Limpa o token
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setLogado(false);
    window.location.href = '/'; 
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4 flex gap-6 justify-center items-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          
          {!logado ? (
            <>
              <Link to="/cadastro-vendedor" className="text-blue-600 font-medium">Sou Vendedor</Link>
              <Link to="/cadastro-cliente" className="text-green-600 font-medium">Sou Cliente</Link>
              <Link to="/login" className="bg-gray-800 text-white px-4 py-1 rounded-md">Entrar</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-blue-600 font-medium">Meu Painel</Link>
              <Link to="/novo-produto" className="text-green-600 font-medium">+ Anunciar</Link>
              <button onClick={handleLogout} className="text-red-500 font-medium border border-red-500 px-3 py-1 rounded">
                Sair
              </button>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro-vendedor" element={<CadastroVendedor />} />
          <Route path="/cadastro-cliente" element={<CadastroComprador />} />
          <Route path="/novo-produto" element={<CadastroProduto />} />
          <Route path="/dashboard" element={<DashboardVendedor />} />
          <Route path="/produto/:id" element={<DetalhesProduto />} />
        </Routes>
      </div>
    </Router>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Adicione estas duas linhas dentro de suas rotas */}
        <Route path="/loja/:id" element={<StorePage />} />
        <Route path="/produto/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;