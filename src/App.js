import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/navegacion/navbar';
import Index from './Components/paginas';
import Pagina1 from './Components/paginas/pagina1';
import Pagina2 from './Components/paginas/pagina2';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/pagina1' element={<Pagina1 />} />
          <Route path='/pagina2' element={<Pagina2 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

