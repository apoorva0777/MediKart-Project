import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

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

    // Calculate total amount in rupees (not multiplied by 100)
    const amount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    try {
      // Create order on backend
      const orderResponse = await fetch('http://localhost:5000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ amount }), // amount in rupees
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        alert('Failed to create order. Please try again.');
        setLoading(false);
        return;
      }

      const options = {
        key: window.process?.env?.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_UC8ozWhDmsJEYa', // Use env variable or fallback key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'MediKart',
        description: 'Purchase from MediKart',
        order_id: orderData.id,
        handler: async function (response) {
          // Verify payment on backend
          const verifyResponse = await fetch('http://localhost:5000/api/payment/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyResponse.json();
          if (verifyResponse.ok && verifyData.status === 'success') {
            alert('Payment successful! Thank you for your purchase.');
            clearCart();
            setOrderConfirmed(true);
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

      // Fix for process is not defined error in frontend
      if (!window.process) {
        window.process = { env: { REACT_APP_RAZORPAY_KEY_ID: 'rzp_test_UC8ozWhDmsJEYa' } };
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
      <div>
        <h1>Order Confirmed</h1>
        <p>Thank you for your purchase! Your order has been successfully placed.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Checkout</h1>
      <p>Total Amount: ₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay with Razorpay'}
      </button>
    </div>
  );
};

export default CheckoutPage;
