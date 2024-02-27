import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Artistas } from './components/Artistas/Artistas'
import { Footer } from './components/Footer/Footer'
import { Galeria } from './components/Galeria/Galeria'
import { Index } from './components/Index/Index'
import { Marcas } from './components/Marcas/Marcas'
import { Opiniones } from './components/Opiniones/Opiniones'
import { Productos } from './components/Productos/Productos'
import { Header } from './components/Header/Header'
import { ArticlesDetailsContainer } from './components/ArticleDetailContainer/ArticleDetailContainer'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/artistas' element={<Artistas />} />
        <Route path='/marcas' element={<Marcas />} />
        <Route path='/productos/:category' element={<Productos />} />
        <Route path='/opiniones' element={<Opiniones />} />
        <Route path='/galeria' element={<Galeria />} />
        <Route path='/detalles/:id' element={<ArticlesDetailsContainer/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
