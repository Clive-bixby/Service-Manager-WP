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

// Helper to normalize WordPress service item
function normalizeWPService(item) {
  return {
    id: item.id,
    title: item.title.rendered,
    description: item.content.rendered.replace(/<[^>]*>/g, ''),
    price: item.acf?.price || '₹0',
    priceValue: Number((item.acf?.price || '0').replace(/[₹,]/g, '')),
    category: item.acf?.category || 'Uncategorized',
    image:
      item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      '/placeholder.jpg'
  };
}

// Replace your existing useEffect with this:
useEffect(() => {
  const base = import.meta.env.VITE_WP_API_URL;
  const wpURL = base ? `${base}/services?_embed` : null;
  const fetchURL = wpURL || '/services.json';

  fetch(fetchURL)
    .then(res => res.json())
    .then(data => {
      const items = Array.isArray(data)
        ? (base ? data.map(normalizeWPService) : data.map(item => ({
            ...item,
            priceValue: Number(item.price.replace(/[₹,]/g, ''))
          })))
        : [];
      setServices(items);
    })
    .catch(err => {
      console.error('Fetch failed, loading local JSON:', err);
      if (base) {
        fetch('/services.json')
          .then(res => res.json())
          .then(data => {
            const normalized = data.map(item => ({
              ...item,
              priceValue: Number(item.price.replace(/[₹,]/g, ''))
            }));
            setServices(normalized);
          })
          .catch(console.error);
      }
    });
}, []);



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
