import { useEffect, useState } from 'react'
import Card from './Card'

function Products () {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
            setProducts(data)
        }
        fetchProducts()
    }, [])
    return (
        <>
        <div className="flex flex-col text-center w-full bg-gray-200">
        <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mt-20">Los productos más populares</h2>
        </div>
        {
            products.length > 0 ? 
            <Card products={products} /> 
            :
            <div>Loading.....</div>
        }
        </>
    )                  
}

export default Products