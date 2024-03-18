import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { CartContextProvider } from './Context/CartContext'
import { ArticlesDetailsContainer } from './components/ArticleDetailContainer/ArticleDetailContainer'
import { Artistas } from './components/Artistas/Artistas'
import { CartDeployment } from './components/CartDeployment/CartDeployment'
import { Footer } from './components/Footer/Footer'
import { Galeria } from './components/Galeria/Galeria'
import { Header } from './components/Header/Header'
import { Index } from './components/Index/Index'
import { Marcas } from './components/Marcas/Marcas'
import { Opiniones } from './components/Opiniones/Opiniones'
import { ProductsContainer } from './components/ProductsContainer/ProductsContainer'
import { CheckOut } from './components/Checkout/Checkout'

function App() {

  return (
    <CartContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='/artistas' element={<Artistas />} />
          <Route path='/marcas' element={<Marcas />} />
          <Route path='/products' element={<ProductsContainer />} />
          <Route path='/products/:category' element={<ProductsContainer />} />
          <Route path='/opiniones' element={<Opiniones />} />
          <Route path='/galeria' element={<Galeria />} />
          <Route path='/details/:id' element={<ArticlesDetailsContainer />} />
          <Route path='/cart' element={<CartDeployment />} />
          <Route path='/checkout' element={<CheckOut />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartContextProvider>
  )
}

export default App
