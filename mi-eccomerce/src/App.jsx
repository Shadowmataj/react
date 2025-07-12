import { CookiesProvider } from 'react-cookie'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ArticlesDetailsContainer } from './components/ArticleDetailContainer/ArticleDetailContainer'
import { Artistas } from './components/Artistas/Artistas'
import { CartDeployment } from './components/CartDeployment/CartDeployment'
import { CheckOut } from './components/CheckOut/CheckOut'
import { Footer } from './components/Footer/Footer'
import { Galeria } from './components/Galeria/Galeria'
import { Header } from './components/Header/Header'
import { Index } from './components/Index/Index'
import { LoginContainer } from './components/LoginContainer/LoginContainer'
import { Marcas } from './components/Marcas/Marcas'
import { Opiniones } from './components/Opiniones/Opiniones'
import { ProductsContainer } from './components/ProductsContainer/ProductsContainer'
import { ProfileContainer } from './components/ProfileContainer/ProfileContainer'
import { RegisterContainer } from './components/RegisterContainer/RegisterContainer'
import { CartContextProvider } from './Context/CartContext.jsx'
import { UserContextProvider } from './Context/UserContext.jsx'
import Settings from './components/Settings/Settings'

function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <CookiesProvider defaultSetOptions={{ path: "/" }}>
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
              <Route path='/login' element={<LoginContainer />} />
              <Route path='/login/:message' element={<LoginContainer />} />
              <Route path='/register' element={<RegisterContainer />} />
              <Route path='/profile' element={<ProfileContainer />} />
              <Route path='/admin/settings' element={<Settings />} />
            </Routes>
            <Footer />
          </CookiesProvider>
        </BrowserRouter>
      </CartContextProvider >
    </UserContextProvider>
  )
}

export default App
