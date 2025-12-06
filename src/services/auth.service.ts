import { Injectable, signal } from '@angular/core';
import { User, MOCK_USERS } from '../data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<User | null>(null);
  isAuthenticated = signal(false);

  constructor() {
    // In a real app, you'd check for a token in localStorage
  }

  login(email: string, password: string): User | null {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
      return user;
    }
    return null;
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    // In a real app, you'd remove the token from localStorage
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
}
