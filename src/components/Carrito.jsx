import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

function Cart () {
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)
    const [preferenceId, setPreferenceId] = useState(null);
    const carts = JSON.parse(localStorage.getItem('cart')) || []

    initMercadoPago('TEST-bfce1e36-2cd3-475f-9352-44483e8296a3');

    useEffect(() => {
        const total = carts.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
    }, 0)
    setTotal(total)
    }, [carts])

    const handleInc = (id) => {
    const updatedCart = carts.map(item => {
        if(item.id === id) {
            return {
                ...item,
                quantity: item.quantity + 1
            }
        }
    return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
    }

    const handleDec = (id) => {
    const updatedCart = carts.map(item => {
        if(item.id === id) {
            return {
                ...item,
                quantity: item.quantity - 1
            }
      }
      return item
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
    }

    const removeProduct = (id) => {
    const updatedCart = carts.filter(item => item.id !== id)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    navigate('/cart')
    }

    if(carts.length === 0) {
        return <div className=' h-[55vh] flex justify-center items-center text-4xl '>Tu carrito está vacío</div>
    }

    const createPreference = async () => {
      try {
        const response = await axios.post("https://mercapp-back.onrender.com/create_preference", {
          description: "gracias por la compra",
          price: total,
          quantity: 1
        });
        const { id } = response.data;
        return id;
      }catch (error) {
        console.log(error);
      }
    };

    const handleBuy = async () => {
      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
      }
    }
    
    return (
        <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="flex justify-between border-b pb-8 lg:w-3/5 lg:pr-0 pr-0 md:w-1/2 md:pr-16">
            <h1 className="font-semibold text-2xl">Carrito de compras</h1>
          </div>
          <div className="flex mt-8 mb-5 w-full lg:w-3/5 lg:pr-0  md:w-1/2 md:pr-16">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Productos</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Cantidad</h3>
            <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">Total</h3>
          </div>
          <div className="lg:-mt-48 bg-white py-10 lg:w-3/5 lg:pr-0 pr-0 md:w-1/2 md:pr-16">
          {
                carts?.map(cart => {
                  return (
                    <div key={cart.id}>
                    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                      <div className="flex w-2/5">
                        <div className="w-20">
                          <img className="h-24" src={cart?.image} alt={cart?.title} />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">{cart?.title}</span>
                          <span className="text-red-500 text-xs capitalize">{cart?.category}</span>
                          <div className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer" onClick={() => removeProduct(cart?.id)}>Eliminar</div>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" onClick={() => handleDec(cart?.id)}><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
    
                        <input className="mx-2 border text-center w-8" type="text" defaultValue={cart?.quantity} />
    
                        <svg className="fill-current text-gray-600 w-3 cursor-pointer" onClick={() => handleInc(cart?.id)} viewBox="0 0 448 512">
                          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                        </svg>
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">${cart?.price * cart?.quantity}</span>
                    </div>
                    </div>
                  )
                })
              }
    
              <Link to={'/'} className="flex font-semibold text-indigo-600 text-sm mt-10">
    
                <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                Continuar comprando
              </Link>
          </div>

          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h1 className="font-semibold text-2xl border-b pb-8">Resumen del pedido</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {carts?.length}</span>
            <span className="font-semibold text-sm">{total?.toFixed(2)}$</span>
          </div>
          <div>
            <label className="font-bold inline-block text-sm uppercase text-green-500">Envío gratis</label>
          </div>
          <div className="py-5">
            <label htmlFor="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Código de promoción</label>
            <input type="text" id="promo" placeholder="Ingrese su código para descuento" className="p-2 text-sm w-full" />
          </div>
          <button className="inline-block rounded-lg text-center text-sm font-semibold outline-none transition duration-100 focus-visible:ring md:text-base bg-blue-100 hover:bg-blue-200 px-5 py-2 text-blue-700 active:bg-blue-300">Aplicar</button>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Costo total</span>
              <span>${(total + 0).toFixed(2)}</span>
            </div>
            <div>
            <button className="inline-block rounded-lg bg-blue-500 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base py-3 w-full" onClick={handleBuy}>Comprar ahora</button>
            {preferenceId && <Wallet initialization={{ preferenceId }} />}
            </div>
          </div>
          </div>
        </div>
      </section>
    )
}

export default Cart
