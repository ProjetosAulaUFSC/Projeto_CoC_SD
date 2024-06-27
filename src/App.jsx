import Navbar from './components/layout/Navbar.jsx';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Home from './components/pages/Home.jsx';
import Regras from './components/pages/Regras.jsx';
import Personagens from './components/pages/Personagens.jsx';
import Footer from './components/layout/Footer.jsx';
import Container from './components/layout/Container.jsx'
import CriarPersonagem from './components/pages/CriarPersonagem.jsx'
import Personagem from './components/pages/Personagem.jsx';

import Tabelas from './components/pages/Tabelas.jsx'

function App(){
  return(
    <BrowserRouter>
      <Navbar/>
      <Container customClass="min-height">
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route  path='/regras' element={<Regras/>} />
          <Route  path='/personagens' element={<Personagens/>} />
          <Route  path='/criarpersonagem' element={<CriarPersonagem/>} />
          <Route  path='/personagem/:id' element={<Personagem/>}/>
          <Route  path='/tabelas' element={<Tabelas/>}/>
        </Routes>
      </Container>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
