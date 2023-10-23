import { Link } from 'react-router-dom'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'

function Feature ({cards = []}) {
    return (
        <section className="text-gray-600 body-font bg-gray-200">
            <div className="container px-5 pb-24 pt-12 mx-auto">
               <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Productos por categorías</h1>
                </div>
                    <div className="flex flex-wrap -m-4">
                        {
                            cards?.map((card) => {
                                return (
                                    <Link to={`/categories/${card}`} key={card} className="p-4 md:w-1/3 cursor-pointer">
                                        <div className="flex rounded-lg h-full bg-white p-8 flex-col">
                                            <div className="flex items-center mb-3">
                                                <MdOutlineProductionQuantityLimits className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-blue-500 flex-shrink-0" />
                                                    <h2 className="text-gray-900 text-lg title-font font-medium capitalize">{card || 'Example card'}</h2>
                                            </div>
                                        <div className="flex-grow">
                                           
                                            <p className="leading-relaxed text-base">Productos que permiten a millones de usuarios comprar, vender, anunciar, enviar y pagar a través de Internet de forma fácil, segura y eficiente.</p>
                                                <div className="mt-3 text-blue-500 inline-flex items-center">Ver productos
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                </div>
            </div>
        </section>
    )
}

export default Feature