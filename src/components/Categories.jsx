import { useEffect, useState } from 'react'
import FeatureCategory from './FeatureCategory'

function Categories () {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('https://fakestoreapi.com/products/categories')
      const data = await response.json()
      setCategories(data)
    }
    fetchCategories()
  }, [])

  if (categories.length === 0) return <div>Cargando..</div>

    return (
        <FeatureCategory cards={categories} key={categories}/>
    )
}

export default Categories