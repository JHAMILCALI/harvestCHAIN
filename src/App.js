import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navegacion/navbar';
import Index from './Components/paginas';
import Productor from './Components/paginas/productor';
import Distribuidor from './Components/paginas/distribuidor';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/productor' element={<Productor />} />
          <Route path='/distribuidor' element={<Distribuidor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

