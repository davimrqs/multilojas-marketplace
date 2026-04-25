import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastroVendedor from './pages/CadastroVendedor';
import CadastroComprador from './pages/CadastroComprador'; // Importação nova
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm p-4 flex gap-6 justify-center">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link to="/cadastro-vendedor" className="text-blue-600 hover:underline font-medium">Sou Vendedor</Link>
          <Link to="/cadastro-cliente" className="text-green-600 hover:underline font-medium">Sou Cliente</Link>
        </nav>

        <Routes>
          <Route path="/cadastro-vendedor" element={<CadastroVendedor />} />
          <Route path="/cadastro-cliente" element={<CadastroComprador />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={
            <div className="text-center mt-20">
              <h1 className="text-4xl font-bold text-gray-800">MultiLojas Marketplace</h1>
              <p className="mt-4 text-gray-600 text-lg">Escolha como deseja se juntar a nós hoje.</p>
              <div className="mt-8 flex justify-center gap-4">
                <Link to="/cadastro-cliente" className="bg-green-600 text-white px-6 py-2 rounded-lg">Quero Comprar</Link>
                <Link to="/cadastro-vendedor" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Quero Vender</Link>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;