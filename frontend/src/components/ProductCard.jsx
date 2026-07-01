import "./ProductCard.css";

function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}) {

  const getFallbackImage = (category) => {
  switch (category?.toLowerCase()) {
    case "laptop":
      return "https://picsum.photos/seed/laptop/500/300";
    case "phone":
      return "https://picsum.photos/seed/phone/500/300";
    case "watch":
      return "https://picsum.photos/seed/watch/500/300";
    case "headphones":
      return "https://picsum.photos/seed/headphones/500/300";
    default:
      return "https://picsum.photos/seed/product/500/300";
  }
};

  const image =
    product.imageUrl && product.imageUrl.trim() !== ""
      ? product.imageUrl
      : getFallbackImage(product.category);

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <div className="product-card">

      <div className="image-wrapper">

        <button className="favorite-btn">
          ♡
        </button>

        <img
          src={image}
          alt={product.name}
          className="product-image"
          onClick={onViewDetails}
          style={{ cursor: "pointer" }}
          onError={(e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = getFallbackImage(product.category);
}}
        />

      </div>

      <div className="card-content">

        <div className="badges">

          <span className="category-badge">
            {product.category}
          </span>

          {product.brand && (
            <span className="brand-badge">
              {product.brand}
            </span>
          )}

        </div>

        <h3>{product.name}</h3>

        <div className="rating">
          ⭐⭐⭐⭐☆ 4.5
        </div>

        <p className="description">
          {product.description}
        </p>

        <div className="card-footer">
          <p className="price">
            {formattedPrice}
          </p>
        </div>

        <button
          className="view-btn"
          onClick={onViewDetails}
        >
          View Details
        </button>

        <button
          className="cart-btn"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default ProductCard;