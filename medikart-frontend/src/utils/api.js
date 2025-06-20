let BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
// Remove trailing slash if present
if (BASE_URL.endsWith('/')) {
  BASE_URL = BASE_URL.slice(0, -1);
}
export default BASE_URL;
