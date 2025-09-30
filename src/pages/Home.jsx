const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Service Manager</h1>
          <p className="hero-tagline">
            Your one-stop solution for professional services and insights
          </p>
          <div className="hero-buttons">
            <a href="/services" className="btn btn-primary">
              Explore Services
            </a>
            <a href="/blog" className="btn btn-secondary">
              Read Our Blog
            </a>
          </div>
        </div>
        <div className="hero-image">
          {/* You can add an image here later */}
          <div className="placeholder-image">
            <span>🚀</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2>Why Choose Service Manager?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Professional Services</h3>
              <p>High-quality services tailored to your business needs</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Expert Insights</h3>
              <p>Stay updated with latest trends and best practices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Trusted Support</h3>
              <p>24/7 support to help you succeed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home