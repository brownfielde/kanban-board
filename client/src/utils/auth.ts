import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {
  getProfile() {
    return jwtDecode<UserData>(this.getToken()) as JwtPayload;
    
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const currentTime = Date.now()/1000;
     if (decodedToken.exp && decodedToken.exp < currentTime)
        return true;
     }

    catch (error) {
      console.error('Error decoding token:', error);
      return true; // If there's an error, assume the token is expired
  }
    return false;
  }

  getToken(): string {
    // TODO: return the token
    const loggedUser = localStorage.getItem('user') || '';
    return loggedUser;
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('user', idToken)
    // TODO: redirect to the home page
    window.location.assign('/');

  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('user');
    // TODO: redirect to the login page
    window.location.assign('login');
  }
}

export default new AuthService();
