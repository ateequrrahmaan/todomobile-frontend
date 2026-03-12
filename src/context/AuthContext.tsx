import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as authApi from "@api/auth";

type AuthState = {
  user: authApi.AuthUser | null;
  token: string | null;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true
  });

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const [token, userJson] = await Promise.all([
          AsyncStorage.getItem(AUTH_TOKEN_KEY),
          AsyncStorage.getItem(AUTH_USER_KEY)
        ]);

        if (token && userJson) {
          const user = JSON.parse(userJson) as authApi.AuthUser;
          setState({ user, token, isLoading: false });
        } else {
          setState({ user: null, token: null, isLoading: false });
        }
      } catch {
        setState({ user: null, token: null, isLoading: false });
      }
    };

    bootstrap();
  }, []);

  const persistSession = async (
    user: authApi.AuthUser,
    token: string
  ): Promise<void> => {
    await Promise.all([
      AsyncStorage.setItem(AUTH_TOKEN_KEY, token),
      AsyncStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
    ]);
  };

  const login = useCallback(
    async (email: string, password: string) => {
      const { user, token } = await authApi.login(email, password);
      await persistSession(user, token);
      setState({ user, token, isLoading: false });
    },
    []
  );

  const register = useCallback(
    async (email: string, password: string) => {
      const { user, token } = await authApi.register(email, password);
      await persistSession(user, token);
      setState({ user, token, isLoading: false });
    },
    []
  );

  const logout = useCallback(async () => {
    await Promise.all([
      AsyncStorage.removeItem(AUTH_TOKEN_KEY),
      AsyncStorage.removeItem(AUTH_USER_KEY)
    ]);
    setState({ user: null, token: null, isLoading: false });
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};

