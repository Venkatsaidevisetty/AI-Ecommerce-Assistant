import "./ProductDetailsModal.css";

function ProductDetailsModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="modal-image"
        />

        <h2>{product.name}</h2>

        <p>
          <strong>Brand:</strong> {product.brand}
        </p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Price:</strong> ${product.price}
        </p>

        <p>{product.description}</p>
      </div>
    </div>
  );
}

export default ProductDetailsModal;