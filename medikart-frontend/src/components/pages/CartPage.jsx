import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./CartPage.css";
import BASE_URL from '../../utils/api';

const CartPage = () => {
  const { cartItems, updateCartItem } = useContext(CartContext);
  const navigate = useNavigate();

  const handleQuantityChange = (productId, delta) => {
    const item = cartItems.find(item => item.id === productId);
    if (!item) return;
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    updateCartItem(productId, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Create order on backend
    const response = await fetch(`{BASE_URL}/api/payment/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        amount: getTotalPrice(),
        receipt: "receipt_order_74394",
      }),
    });

    const orderData = await response.json();

    if (!response.ok) {
      alert("Failed to create order. Please try again.");
      return;
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
      amount: orderData.amount,
      currency: orderData.currency,
      name: "MediKart",
      description: "Test Transaction",
      order_id: orderData.id,
      handler: async function (response) {
        // Verify payment on backend
        const verifyRes = await fetch(`{BASE_URL}/api/payment/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(response),
        });
        const verifyData = await verifyRes.json();
        if (verifyData.status === "success") {
          alert("Payment successful!");
          clearCart();
          // Optionally navigate to success page
        } else {
          alert("Payment verification failed. Please contact support.");
        }
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-details">
                  <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">₹{item.price.toFixed(2)}</span>
                </div>
                <div>
                  <button
                    className="cart-button"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button
                    className="cart-button"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    +
                  </button>
                  <button
                    className="cart-button"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">Total: ₹{getTotalPrice().toFixed(2)}</div>
          <div className="cart-actions">
            {/* <button className="cart-button" onClick={handlePayment}>
              Pay Now
            </button> */}
            <button className="cart-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
