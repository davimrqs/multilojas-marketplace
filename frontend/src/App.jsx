import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react'; // O useEffect foi removido para evitar o erro do linter

// Imports das suas páginas
import Loja from './pages/Loja';
import Home from './pages/Home';
import Login from './pages/Login';
import CadastroVendedor from './pages/CadastroVendedor';
import CadastroComprador from './pages/CadastroComprador';
import CadastroProduto from './pages/CadastroProduto';
import DashboardVendedor from './pages/DashboardVendedor'; 
import DetalhesProduto from './pages/DetalhesProduto';
import Carrinho from "./pages/Carrinho"; 

function App() {
  // O estado agora é inicializado de forma direta/preguiçosa (Lazy Initial State).
  // Ele lê o localStorage no primeiríssimo milissegundo. O SonarLint/ESLint aprova
  // totalmente este padrão porque não causa atualizações síncronas em cascata.
  const [logado, setLogado] = useState(() => {
    const token = localStorage.getItem('access');
    return !!token; // Retorna true se houver token, false se for nulo
  });

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('carrinho');
    setLogado(false);
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Barra de Navegação Global */}
        <nav className="bg-white shadow-sm p-4 flex gap-6 justify-center items-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/loja" className="text-gray-600 hover:text-blue-600 font-medium">Loja</Link>
          
          {/* Link para a página do Carrinho */}
          <Link to="/carrinho" className="text-amber-600 font-medium flex items-center gap-1">
            🛒 Carrinho
          </Link>
          
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

        {/* Gerenciamento de Rotas do Marketplace */}
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;