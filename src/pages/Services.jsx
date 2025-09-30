import { useState, useEffect } from 'react'
import ServiceCard from '../components/ServiceCard'
import './Services.css'

const Services = () => {
  const [services, setServices] = useState([])
  const [filters, setFilters] = useState({
    category: '',
    maxPrice: Infinity,
    search: ''
  })

  useEffect(() => {
  fetch('https://service-manager-wp.local/wp-json/wp/v2/services?_embed')
    .then(res => res.json())
    .then(data => {
      const normalized = data.map(item => ({
        id: item.id,
        title: item.title.rendered,
        description: item.content.rendered.replace(/<[^>]*>/g, ''),
        price: item.acf?.price || '₹0',
        priceValue: Number((item.acf?.price || '0').replace(/[₹,]/g, '')),
        category: item.acf?.category || 'Uncategorized',
        image:
          item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          '/placeholder.jpg'
      }))
      setServices(normalized)
    })
    .catch(console.error)
}, [])


  const filtered = services.filter(item => {
    const matchesCategory = filters.category
      ? item.category === filters.category
      : true
    const matchesPrice = item.priceValue <= filters.maxPrice
    const matchesSearch = filters.search
      ? item.title.toLowerCase().includes(filters.search.toLowerCase())
      : true
    return matchesCategory && matchesPrice && matchesSearch
  })

  const categories = Array.from(new Set(services.map(s => s.category)))

  return (
    <div className="services-page container">
      <h1>Our Services</h1>

      <div className="filters">
        <label>
          Category:
          <select
            value={filters.category}
            onChange={e =>
              setFilters(f => ({ ...f, category: e.target.value }))
            }
          >
            <option value="">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          Max Price (₹):
          <input
            type="number"
            placeholder="e.g. 2000"
            onChange={e =>
              setFilters(f => ({
                ...f,
                maxPrice: e.target.value ? Number(e.target.value) : Infinity
              }))
            }
          />
        </label>

        <label>
          Search:
          <input
            type="text"
            placeholder="Search services..."
            value={filters.search}
            onChange={e =>
              setFilters(f => ({ ...f, search: e.target.value }))
            }
          />
        </label>
      </div>

      <div className="cards-grid">
        {filtered.length > 0 ? (
          filtered.map(service => (
            <ServiceCard key={service.id} {...service} />
          ))
        ) : (
          <p>No services match your criteria.</p>
        )}
      </div>
    </div>
  )
}

export default Services
