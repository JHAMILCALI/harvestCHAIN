import logo from './logo.svg';
import './App.css';
import { Helmet } from 'react-helmet'; // Importa react-helmet
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navegacion/navbar';
import Index from './Components/paginas/index';
import Productor from './Components/paginas/productor';
import Distribuidor from './Components/paginas/distribuidor';
import Comprador from './Components/paginas/comprador';
import Footer from './Components/navegacion/footer';

function App() {
  return (
    <div className='App'>
       <Helmet>
        {/* Otros enlaces de estilos y metadatos */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Helmet>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/productor' element={<Productor />} />
          <Route path='/distribuidor' element={<Distribuidor />} />
          <Route path='/comprador' element={<Comprador />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;

