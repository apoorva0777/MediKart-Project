const fetch = require('node-fetch');

async function registerUser(name, email, password) {
  const response = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Registration failed:', errorData.message);
    return null;
  }

  const data = await response.json();
  console.log('User registered:', data);
  return data;
}

// Replace with desired user details
const name = 'Test User';
const email = 'testuser@example.com';
const password = 'testpassword';

registerUser(name, email, password).catch(console.error);
