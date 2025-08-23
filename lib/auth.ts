// Simple local authentication service to replace Firebase Auth
export interface User {
  email: string;
  displayName?: string;
  uid: string;
}

// Admin email whitelist - only these emails have admin access
const ADMIN_EMAILS = [
  'vanxuatx@gmail.com', // Main admin email
  'admin@example.com', // Add other emails if needed
];

// Simple mock user data
const MOCK_USER: User = {
  email: 'admin@example.com',
  displayName: 'Admin User',
  uid: 'mock-admin-uid'
};

export const authService = {
  // Simple login (no actual Google auth, just mock)
  signInWithGoogle: async () => {
    try {
      // In a real implementation without Firebase, you'd integrate with another auth provider
      // For now, we'll just return a mock admin user
      const user = MOCK_USER;

      // Check if user is in whitelist
      if (!ADMIN_EMAILS.includes(user.email || '')) {
        throw new Error('You do not have admin panel access');
      }

      // Store user in localStorage for persistence
      localStorage.setItem('auth-user', JSON.stringify(user));

      return user;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Sign out
  signOut: async () => {
    try {
      localStorage.removeItem('auth-user');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Check if user is admin
  isAdmin: (user: User | null) => {
    return user && ADMIN_EMAILS.includes(user.email || '');
  },

  // Get current user from localStorage
  getCurrentUser: (): User | null => {
    try {
      const userStr = localStorage.getItem('auth-user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Subscribe to auth state changes (simplified)
  onAuthStateChanged: (callback: (user: User | null) => void) => {
    // Initial call
    callback(authService.getCurrentUser());

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth-user') {
        const user = e.newValue ? JSON.parse(e.newValue) : null;
        callback(user);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Return unsubscribe function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }
};
