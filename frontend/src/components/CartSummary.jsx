function CartSummary({
  cartItems,
  cartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) {
  if (cartItems.length === 0) {
    return null;
  }

  return (
    <div className="cart-summary">
      <h3>🛒 Cart Summary</h3>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div>
            <strong>{item.name}</strong>
            <p>${item.price.toFixed(2)}</p>
          </div>

          <div className="cart-controls">
            <button onClick={() => decreaseQuantity(item.id)}>−</button>

            <span>{item.quantity}</span>

            <button onClick={() => increaseQuantity(item.id)}>+</button>

            <button
              className="remove-btn"
              onClick={() => removeFromCart(item.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      ))}

      <hr />

      <h4>
        Total: <span>${cartTotal.toFixed(2)}</span>
      </h4>
    </div>
  );
}

export default CartSummary;