"use client";
import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";

// Types for User and AuthContext
interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Assuming a function `fetchUser` that verifies the token and fetches user info
      fetchUser(token)
        .then((userData) => {
          setIsAuthenticated(true);
          setUser(userData);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUser(null);
        });
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("authToken", token);
    setIsAuthenticated(true);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// A mock function for fetching user data (you'll replace this with your API logic)
const fetchUser = (token: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Replace with an actual API call to validate token and fetch user
    if (token === "validToken") {
      resolve({ id: "123", email: "user@example.com" });
    } else {
      reject("Invalid token");
    }
  });
};
