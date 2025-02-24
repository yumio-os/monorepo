import { Accessor, createContext, createEffect, createSignal, JSX, Setter, useContext } from 'solid-js';

// import { Admin } from '../apollo/gql';

interface AuthState {
  isAuthenticated: boolean;
  user?: { role: any; id: number };
  bearer?: string;
}

interface AuthContextValue {
  authState: Accessor<AuthState>;
  setAuthState: Setter<AuthState>;
}

// Create a context with a default value of undefined
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Key for localStorage
const AUTH_STATE_KEY = 'authState';

export function AuthProvider(props: { children: JSX.Element }): JSX.Element {
  // Initialize state from localStorage, or default to the initial state
  const initialAuthState: AuthState = JSON.parse(localStorage.getItem(AUTH_STATE_KEY) || 'null') || {
    isAuthenticated: false,
    user: null,
    bearer: null,
  };

  const [authState, setAuthState] = createSignal<AuthState>(initialAuthState);

  // Update localStorage whenever the authState changes
  createEffect(() => {
    localStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authState()));
  });

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
