
import { jwtDecode as decode } from 'jwt-decode';

class AuthService {
  // Retrieves the user profile from the decoded token
  getProfile() {
    return decode(this.getToken());
  }

  // Checks if the user is currently logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Checks if the token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000;
    } catch (err) {
      return false;
    }
  }

  // Retrieves the user token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Saves the user token to localStorage and redirects to the home page
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    // Consider making the redirect location configurable
    window.location.assign('/');
  }

  // Clears the user token and profile data from localStorage and reloads the page
  logout() {
    localStorage.removeItem('id_token');
    // Consider making the redirect location configurable
    window.location.assign('/');
  }
}

const authInstance = new AuthService();
export default authInstance;