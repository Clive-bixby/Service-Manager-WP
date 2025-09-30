import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './BlogDetails.css'

const BlogDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  fetch(
    `https://service-manager-wp.local/wp-json/wp/v2/posts/${id}?_embed`
  )
    .then(res => res.json())
    .then(data => {
      setPost({
        id: data.id,
        title: data.title.rendered,
        content: data.content.rendered,
        image:
          data._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          '/placeholder.jpg'
      })
    })
    .catch(console.error)
    .finally(() => setLoading(false))
}, [id])


  if (loading) {
    return <p className="loading">Loading...</p>
  }
  if (!post) {
    return (
      <div className="error">
        <p>Blog post not found.</p>
        <button onClick={() => navigate('/blog')}>Back to Blog</button>
      </div>
    )
  }

  return (
    <article className="blog-details container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1 className="post-title">{post.title}</h1>
      {post.image && (
        <div className="post-image-wrapper">
          <img src={post.image} alt={post.title} loading="lazy" className="post-image" />
        </div>
      )}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}

export default BlogDetails
