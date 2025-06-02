const fetch = require('node-fetch');

async function loginAndGetToken(email, password) {
  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    console.error('Login failed:', response.statusText);
    return null;
  }

  const data = await response.json();
  console.log('JWT Token:', data.token);
  return data.token;
}

// Updated with provided user credentials
const email = 'apoorvashukla744@gmail.com';
const password = '1234';

loginAndGetToken(email, password).catch(console.error);
