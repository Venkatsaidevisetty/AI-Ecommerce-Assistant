function Hero({
  message,
  setMessage,
  handleSearch,
  loading,
  cartCount,
}) {
  return (
    <div className="hero">
      <div className="hero-top">
        <div>
          <span className="eyebrow">AI Shopping Assistant</span>
          <h1 className="title">
            Describe what you need. <span className="accent">We'll find it.</span>
          </h1>
        </div>

        <div className="cart-counter">Cart ({cartCount})</div>
      </div>

      <p className="subtitle">
        Search by <b>brand</b>, <b>category</b>, or <b>price</b> — or just
        describe what you're looking for in plain language.
      </p>

      <div className="search-box">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder='Try "gaming laptop under $1000"'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </button>
      </div>

      <div className="stats">
        <div className="stat-card">
          <strong>AI</strong>Natural language search
        </div>

        <div className="stat-card">
          <strong>Spring Boot</strong>REST API backend
        </div>

        <div className="stat-card">
          <strong>MongoDB</strong>Product database
        </div>

        <div className="stat-card">
          <strong>React</strong>Frontend
        </div>
      </div>
    </div>
  );
}

export default Hero;
