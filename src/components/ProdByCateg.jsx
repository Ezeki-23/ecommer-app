import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from './Card'

function ProdByCateg () {
    const { name } = useParams()
    const [products, setProducts] = useState([])

    useEffect(() => {
      const fetchProducts = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/category/${name}`)
        const data = await response.json()
        setProducts(data)
      }
      fetchProducts()
    }, [])

    if (products.lenght === 0) return <div>Cargando...</div>
  
    return (
      <Card products={products} />
    )
}

export default ProdByCateg