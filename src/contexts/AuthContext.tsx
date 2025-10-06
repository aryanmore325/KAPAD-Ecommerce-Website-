import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  registerAdmin: (email: string, password: string, name: string, adminCode: string) => Promise<void>;
  logout: () => void;
  isAdmin: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize demo admin account
  const initializeAdminAccount = () => {
    const admins = JSON.parse(localStorage.getItem('demo_admin_users') || '[]');
    if (admins.length === 0) {
      const defaultAdmin = {
        id: 'admin-1',
        email: 'admin@example.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
      };
      localStorage.setItem('demo_admin_users', JSON.stringify([defaultAdmin]));
    }
  };

  // Call it when component mounts
  useEffect(() => {
    initializeAdminAccount();
  }, []);

  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      const users = JSON.parse(localStorage.getItem('demo_users') || '[]');
      const user = users.find((u: any) => 
        u.email === credentials.email && 
        u.password === credentials.password &&
        u.role === 'user'
      );

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const authUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: 'user'
      };

      setState({ user: authUser, isAuthenticated: true });
      localStorage.setItem('demo_auth_user', JSON.stringify(authUser));
      
      toast({
        title: 'Success',
        description: 'Logged in successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid email or password',
        variant: 'destructive',
      });
      throw error;
    }
  }, []);

  const loginAdmin = useCallback(async (email: string, password: string) => {
    try {
      const users = JSON.parse(localStorage.getItem('demo_admin_users') || '[]');
      const admin = users.find((u: any) => 
        u.email === email && 
        u.password === password &&
        u.role === 'admin'
      );

      if (!admin) {
        throw new Error('Invalid admin credentials');
      }

      const authUser: User = {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: 'admin'
      };

      setState({ user: authUser, isAuthenticated: true });
      localStorage.setItem('demo_auth_user', JSON.stringify(authUser));
      
      toast({
        title: 'Success',
        description: 'Admin logged in successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid admin credentials',
        variant: 'destructive',
      });
      throw error;
    }
  }, []);

  const register = useCallback(async (credentials: RegisterCredentials) => {
    try {
      const users = JSON.parse(localStorage.getItem('demo_users') || '[]');
      
      if (users.some((u: any) => u.email === credentials.email)) {
        throw new Error('Email already exists');
      }

      const newUser = {
        id: Date.now().toString(),
        email: credentials.email,
        password: credentials.password,
        name: credentials.name,
        role: 'user'
      };

      users.push(newUser);
      localStorage.setItem('demo_users', JSON.stringify(users));

      toast({
        title: 'Success',
        description: 'Registration successful',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Registration failed',
        variant: 'destructive',
      });
      throw error;
    }
  }, []);

  const registerAdmin = useCallback(async (email: string, password: string, name: string, adminCode: string) => {
    try {
      // In a real application, you would validate the admin code against a secure backend
      if (adminCode !== 'SECURE_ADMIN_CODE') {
        throw new Error('Invalid admin registration code');
      }

      const admins = JSON.parse(localStorage.getItem('demo_admin_users') || '[]');
      
      if (admins.some((u: any) => u.email === email)) {
        throw new Error('Email already exists');
      }

      const newAdmin = {
        id: Date.now().toString(),
        email,
        password,
        name,
        role: 'admin'
      };

      admins.push(newAdmin);
      localStorage.setItem('demo_admin_users', JSON.stringify(admins));

      toast({
        title: 'Success',
        description: 'Admin registration successful',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Admin registration failed',
        variant: 'destructive',
      });
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false });
    localStorage.removeItem('demo_auth_user');
    toast({
      title: 'Success',
      description: 'Logged out successfully',
    });
  }, []);

  const isAdmin = useCallback(() => {
    return state.user?.role === 'admin';
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ 
      ...state, 
      login, 
      loginAdmin,
      register, 
      registerAdmin,
      logout,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}