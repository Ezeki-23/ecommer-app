import { Link } from 'react-router-dom'
import { FaOpencart } from 'react-icons/fa'
import { AiOutlineShoppingCart } from 'react-icons/ai'

function Encabezado () {
  return (
    <header className="bg-yellow-300 text-gray-600 font-semibold">
    <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
      <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
      <Link to="/categories" className="mr-5 hover:text-gray-900">Categorias</Link>
      <a className="mr-5 hover:text-gray-900">Ofertas</a>
      <a className="hover:text-gray-900">Vender</a>
    </nav>
    <div className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
      <FaOpencart className="h-auto w-8 text-blue-500" />
      <span className="ml-3 text-xl">Mercado App</span>
    </div>
    <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
      <Link to="/cart">
      <button className="inline-flex items-center bg-yellow-300 border-0 py-1 px-3 focus:outline-none hover:bg-gray-100 rounded text-base mt-4 md:mt-0">Mi carrito
        <AiOutlineShoppingCart className="w-6 h-6 ml-1" />
      </button>
      </Link>
    </div>
    </div>
    </header>
    )
}

export default Encabezado