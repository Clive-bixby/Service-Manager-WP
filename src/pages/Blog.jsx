// src/pages/Blog.jsx
import { useState, useEffect } from 'react'
import BlogCard from '../components/BlogCard'
import './Blog.css'

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [filters, setFilters] = useState({ category: '', tag: '' })

  useEffect(() => {
    fetch('https://service-manager-wp.local/wp-json/wp/v2/posts?_embed')
      .then(res => res.json())
      .then(data => {
        const normalized = data.map(item => ({
          id: item.id,
          title: item.title.rendered,
          excerpt: item.excerpt.rendered.replace(/<[^>]*>/g, ''),
          content: item.content.rendered,
          image:
            item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
            '/placeholder.jpg'
        }))
        setPosts(normalized)
      })
      .catch(console.error)
  }, [])


  // Derive categories and tags safely (if fields exist)
  const categories = Array.from(new Set(posts.map(p => p.category).filter(Boolean)))
  const tags = Array.from(new Set(posts.flatMap(p => p.tags || [])))

  const filtered = posts.filter(post => {
    const matchesCategory = filters.category
      ? post.category === filters.category
      : true
    const matchesTag = filters.tag
      ? (post.tags || []).includes(filters.tag)
      : true
    return matchesCategory && matchesTag
  })

  return (
    <div className="blog-page container">
      <h1>Blog</h1>

      <div className="filters">
        <label>
          Category:
          <select
            value={filters.category}
            onChange={e =>
              setFilters(f => ({ ...f, category: e.target.value }))
            }
          >
            <option key="all-categories" value="">
              All Categories
            </option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <label>
          Tag:
          <select
            value={filters.tag}
            onChange={e =>
              setFilters(f => ({ ...f, tag: e.target.value }))
            }
          >
            <option key="all-tags" value="">
              All Tags
            </option>
            {tags.map(tag => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="cards-grid">
        {filtered.length > 0 ? (
          filtered.map(post => <BlogCard key={post.id} post={post} />)
        ) : (
          <p>No posts match your filters.</p>
        )}
      </div>
    </div>
  )
}

export default Blog
