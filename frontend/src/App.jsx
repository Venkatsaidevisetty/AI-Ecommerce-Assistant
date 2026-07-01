import { useState } from "react";
import ProductCard from "./components/ProductCard";
import Hero from "./components/Hero";
import CartSummary from "./components/CartSummary";
import ProductDetailsModal from "./components/ProductDetailsModal";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [toast, setToast] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:8080/api/ai/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) {
        throw new Error("Backend error: " + response.status);
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Search error:", error);
      setProducts([]);
      alert("Search failed. AI service or backend error.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });

    setToast(`${product.name} added to cart`);

    setTimeout(() => {
      setToast("");
    }, 2000);
  };

  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "lowToHigh") {
      return a.price - b.price;
    }

    if (sortOption === "highToLow") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <div className="app">
      {toast && <div className="toast">{toast}</div>}

      <Hero
        message={message}
        setMessage={setMessage}
        handleSearch={handleSearch}
        loading={loading}
        cartCount={cartCount}
      />

      <CartSummary
        cartItems={cartItems}
        cartTotal={cartTotal}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
      />

      <div className="products-header">
        <h2>Products</h2>

        {!loading && products.length > 0 && (
          <p className="results-count">
            Showing {products.length} result{products.length > 1 ? "s" : ""}
          </p>
        )}
      </div>

      {products.length > 0 && (
        <select
          className="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      )}

      {loading && <p className="loading">Searching with AI...</p>}

      {!loading && products.length === 0 && (
        <p className="empty-state">No products found.</p>
      )}

      <div className="products-grid">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
            onViewDetails={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;