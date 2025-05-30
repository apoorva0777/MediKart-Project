import React, { useState, useEffect, useContext } from 'react'
import './ProductsPage.css'
import { CartContext } from '../../context/CartContext'

const ProductsPage = () => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [inStockOnly, setInStockOnly] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { addToCart } = useContext(CartContext)

  const categories = ['All Products', 'Medicines', 'Medical Equipment']

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:5000/api/medicines')
        if (!response.ok) {
          throw new Error('Failed to fetch medicines')
        }
        const data = await response.json()
        setProducts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchMedicines()
  }, [])

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  // State for sidebar categories filtered by top category tabs
  const [filteredSidebarCategories, setFilteredSidebarCategories] = React.useState({
    'Pain Relief': true,
    Antibiotics: true,
    Vitamins: true,
    Allergy: true,
    'Digestive Health': true,
    'Monitoring Devices': true,
    'Diagnostic Tools': true,
    'Respiratory Equipment': true,
  })

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)

    // Update sidebar categories based on selected top category tab
    if (category === 'Medicines') {
      setFilteredSidebarCategories({
        'Pain Relief': true,
        Antibiotics: true,
        Vitamins: true,
        Allergy: true,
        'Digestive Health': true,
        'Monitoring Devices': false,
        'Diagnostic Tools': false,
        'Respiratory Equipment': false,
      })
      // Reset sidebar category selections when switching top tab
      setSidebarCategories({
        'Pain Relief': false,
        Antibiotics: false,
        Vitamins: false,
        Allergy: false,
        'Digestive Health': false,
        'Monitoring Devices': false,
        'Diagnostic Tools': false,
        'Respiratory Equipment': false,
      })
    } else if (category === 'Medical Equipment') {
      setFilteredSidebarCategories({
        'Pain Relief': false,
        Antibiotics: false,
        Vitamins: false,
        Allergy: false,
        'Digestive Health': false,
        'Monitoring Devices': true,
        'Diagnostic Tools': true,
        'Respiratory Equipment': true,
      })
      // Reset sidebar category selections when switching top tab
      setSidebarCategories({
        'Pain Relief': false,
        Antibiotics: false,
        Vitamins: false,
        Allergy: false,
        'Digestive Health': false,
        'Monitoring Devices': false,
        'Diagnostic Tools': false,
        'Respiratory Equipment': false,
      })
    } else {
      // All Products selected
      setFilteredSidebarCategories({
        'Pain Relief': true,
        Antibiotics: true,
        Vitamins: true,
        Allergy: true,
        'Digestive Health': true,
        'Monitoring Devices': true,
        'Diagnostic Tools': true,
        'Respiratory Equipment': true,
      })
      // Reset sidebar category selections when switching top tab
      setSidebarCategories({
        'Pain Relief': false,
        Antibiotics: false,
        Vitamins: false,
        Allergy: false,
        'Digestive Health': false,
        'Monitoring Devices': false,
        'Diagnostic Tools': false,
        'Respiratory Equipment': false,
      })
    }
  }

  const handleInStockChange = () => {
    setInStockOnly(!inStockOnly)
  }

  // New state for sidebar category filters
  const [sidebarCategories, setSidebarCategories] = React.useState({
    'Pain Relief': false,
    Antibiotics: false,
    Vitamins: false,
    Allergy: false,
    'Digestive Health': false,
    'Monitoring Devices': false,
    'Diagnostic Tools': false,
    'Respiratory Equipment': false,
  })

  const toggleSidebarCategory = (category) => {
    setSidebarCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by top category tabs
    const matchesCategory =
      selectedCategory === 'All Products' ||
      (selectedCategory === 'Medicines' &&
        (product.categories && (
          product.categories.includes('Pain Relief') ||
          product.categories.includes('Antibiotics') ||
          product.categories.includes('Vitamins') ||
          product.categories.includes('Allergy') ||
          product.categories.includes('Digestive Health')
        ))) ||
      (selectedCategory === 'Medical Equipment' &&
        (product.categories && (
          product.categories.includes('Monitoring Devices') ||
          product.categories.includes('Diagnostic Tools') ||
          product.categories.includes('Respiratory Equipment')
        )))

    // Filter by sidebar categories (if any selected) and filtered sidebar categories
    const sidebarCategorySelected = Object.values(sidebarCategories).some(Boolean)
    const matchesSidebarCategory =
      (!sidebarCategorySelected || (product.categories && product.categories.some((cat) => sidebarCategories[cat]))) &&
      product.categories && product.categories.some((cat) => filteredSidebarCategories[cat])

    const matchesStock = !inStockOnly || product.inStock

    return matchesSearch && matchesCategory && matchesSidebarCategory && matchesStock
  })

  if (loading) {
    return <div>Loading products...</div>
  }

  if (error) {
    return <div>Error loading products: {error}</div>
  }

  return (
    <div className="products-page">
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search medicines..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="category-tabs">
        {categories.map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <form className="filters" onSubmit={(e) => e.preventDefault()}>
        <button
          type="button"
          onClick={() => {
            setSearchTerm('')
            setSelectedCategory('All Products')
            setInStockOnly(false)
            setSidebarCategories({
              'Pain Relief': false,
              Antibiotics: false,
              Vitamins: false,
              Allergy: false,
              'Digestive Health': false,
              'Monitoring Devices': false,
              'Diagnostic Tools': false,
              'Respiratory Equipment': false,
            })
          }}
        >
          Reset Filters
        </button>
      </form>
      <div className="product-list">
        <aside className="sidebar">
          <h3>Categories</h3>
          <ul>
            {Object.keys(sidebarCategories).map((category) => (
              filteredSidebarCategories[category] && (
                <li key={category}>
                  <label>
                    <input
                      type="checkbox"
                      checked={sidebarCategories[category]}
                      onChange={() => toggleSidebarCategory(category)}
                    />
                    {category}
                  </label>
                </li>
              )
            ))}
          </ul>
          <h3>Availability</h3>
          <label>
            <input type="checkbox" checked={inStockOnly} onChange={handleInStockChange} />
            In Stock Only
          </label>
        </aside>
        <section className="products">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <div className="product-image">
                <img src={product.imageUrl || 'src/assets/med.jpg'} alt={product.name} />
              </div>
              <div className="product-info">
                <div className="product-categories">
                  {(product.categories || []).map((cat) => (
                    <span key={cat} className="category-badge">
                      {cat}
                    </span>
                  ))}
                </div>
                <h2>{product.name}</h2>
                <p className="brand">{product.brand || 'Unknown Brand'}</p>
                <p className="price">${product.price ? product.price.toFixed(2) : 'N/A'}</p>
                {product.requiresRx ? (
                  <button className="btn-rx" disabled>
                    Requires Rx
                  </button>
                ) : (
                  <button className="btn-add" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}

export default ProductsPage
