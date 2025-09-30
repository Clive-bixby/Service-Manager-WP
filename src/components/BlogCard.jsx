import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './BlogCard.css'

const BlogCard = ({ post }) => (
  <div className="blog-card" key={post.id}>
    <Link to={`/blog/${post.id}`} className="blog-image-link">
      <img src={post.image} alt={post.title} loading="lazy" className="blog-image" />
    </Link>
    <div className="blog-content">
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-excerpt">{post.excerpt}</p>
      <Link to={`/blog/${post.id}`} className="blog-readmore">
        Read More →
      </Link>
    </div>
  </div>
)

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlogCard
