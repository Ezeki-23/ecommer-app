import { Routes, Route } from 'react-router-dom'
import Encabezado from './components/Encabezado'
import Hero from './components/Hero'
import Footer from './components/Footer'
import View from './components/View'
import Categories from './components/Categories'
import ProdByCateg from './components/ProdByCateg'
import Carrito from './components/Carrito'

function App() {
  return (
    <>
    <Encabezado />
    <Routes>
      <Route path="/" element={<Hero /> } />
      <Route path="/view/:id" element={<View />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:name" element={<ProdByCateg />} />
      <Route path="cart" element={<Carrito/>} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
