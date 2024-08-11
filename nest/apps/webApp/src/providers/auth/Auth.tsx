import { Accessor, createContext, createSignal, JSX, Setter, useContext } from 'solid-js';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string } | null;
}

interface AuthContextValue {
  authState: Accessor<AuthState>;
  setAuthState: Setter<AuthState>;
}

// Create a context with a default value of undefined
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider(props: { children: JSX.Element }): JSX.Element {
  const [authState, setAuthState] = createSignal<AuthState>({ isAuthenticated: false, user: null });

  const value = {
    authState,
    setAuthState,
  };

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

// Custom hook to use the AuthContext
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
