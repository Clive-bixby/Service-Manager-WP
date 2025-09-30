import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './BlogDetails.css'

const BlogDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  // Helper to normalize WordPress single post
function normalizeWPPost(data) {
  return {
    id: data.id,
    title: data.title.rendered,
    content: data.content.rendered,
    image:
      data._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      '/placeholder.jpg'
  };
}

useEffect(() => {
  const base = import.meta.env.VITE_WP_API_URL;
  const wpURL = base ? `${base}/posts/${id}?_embed` : null;

  if (wpURL) {
    // Try WordPress API first
    fetch(wpURL)
      .then(res => res.json())
      .then(data => {
        setPost(normalizeWPPost(data));
      })
      .catch(err => {
        console.error('WordPress API failed, trying local JSON:', err);
        // Fallback to local JSON
        fetch('/blogs.json')
          .then(res => res.json())
          .then(data => {
            const found = data.find(p => p.id.toString() === id);
            setPost(found);
          })
          .catch(console.error);
      })
      .finally(() => setLoading(false));
  } else {
    // Production: use local JSON directly
    fetch('/blogs.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p.id.toString() === id);
        setPost(found);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }
}, [id]);



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
