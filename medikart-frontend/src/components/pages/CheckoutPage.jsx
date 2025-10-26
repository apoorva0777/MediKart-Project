import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import './CheckoutPage.css';
import BASE_URL from '../../utils/api';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
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
    if (!user) {
      alert('Please login to proceed with payment');
      return;
    }
    setLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    const amount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    try {
      const orderResponse = await fetch(`${BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ amount }), 
      });

      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        alert('Failed to create order. Please try again. ' + errorText);
        setLoading(false);
        return;
      }

      const orderData = await orderResponse.json();

      const options = {
        key: window.process?.env?.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_RTivx2VcL6JNAT', 
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'MediKart',
        description: 'Purchase from MediKart',
        order_id: orderData.id,
        handler: async function (response) {
          const verifyResponse = await fetch(`${BASE_URL}/api/payment/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(response),
          });

          if (!verifyResponse.ok) {
            const errorText = await verifyResponse.text();
            alert('Payment verification failed. Please contact support. ' + errorText);
            setLoading(false);
            return;
          }

          const verifyData = await verifyResponse.json();
            if (verifyData.status === 'success') {
              alert('Payment successful! Thank you for your purchase.');
              clearCart();
              setOrderConfirmed(true);
              navigate('/cart');
            } else {
              alert('Payment verification failed. Please contact support.');
            }
            setLoading(false);
          },
        prefill: {
          email: user.email,
        },
        theme: {
          color: '#3399cc',
        },
      };

      if (!window.process) {
        window.process = { env: { REACT_APP_RAZORPAY_KEY_ID: 'rzp_test_RTivx2VcL6JNAT' } };
      }

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert('Payment failed: ' + error.message);
      setLoading(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="checkout-container">
        <div className="order-confirmed">
          <h1>Order Confirmed</h1>
          <p>Thank you for your purchase! Your order has been successfully placed.</p>
        </div>
      </div>
    );
  }

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="checkout-container">
      <h1 className="checkout-header">Checkout</h1>

      <div className="order-summary">
        <h2>Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-quantity">Quantity: {item.quantity}</div>
              </div>
              <div className="cart-item-price">₹{item.price * item.quantity}</div>
            </div>
          ))
        )}
        <div className="total-amount">Total Amount: ₹{totalAmount}</div>
      </div>

      <div className="payment-section">
        <button className="payment-button" onClick={handlePayment} disabled={loading || cartItems.length === 0}>
          {loading ? 'Processing...' : 'Pay with Razorpay'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
