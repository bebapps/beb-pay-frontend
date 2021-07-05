import { useEffect, useRef, useState } from 'react';

interface Tokens {
  refreshToken: {
    token: string;
    expiryDate: string;
  };
  accessToken: {
    token: string;
    expiryDate: string;
  };
}

const TOKENS_LOCAL_STORAGE_KEY = 'bebapps.beb-pay.authorization.tokens';
const PROACTIVELY_REFRESH_TOKENS_BEFORE_EXPIRY_DATE_MS = 1000 * 30; // 30 seconds

const listeners: Set<(tokens: Tokens | null) => void> = new Set();

export const useAuthentication = () => {
  const [tokens, setTokens] = useState<Tokens | null>(() => {
    const tokens = localStorage.getItem(TOKENS_LOCAL_STORAGE_KEY);
    return tokens && JSON.parse(tokens);
  });

  useEffect(() => {
    const listener = setTokens;
    listeners.add(listener);

    const onStorage = (event: StorageEvent) => {
      if (event.key === TOKENS_LOCAL_STORAGE_KEY) {
        setTokens(
          event.newValue
            ? JSON.parse(event.newValue)
            : null,
        );
      }
    };
    window.addEventListener('storage', onStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const handleAuthorizationResponse = async (response: Response) => {
    const body = await response.json();
    if (body.success) {
      const tokens = body.result.authorization;
      localStorage.setItem(TOKENS_LOCAL_STORAGE_KEY, JSON.stringify(tokens));
      listeners.forEach((listener) => listener(tokens));
      return tokens;
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    });
    return await handleAuthorizationResponse(response);
  };

  const register = async (email: string, password: string) => {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ email, password }),
    });
    return await handleAuthorizationResponse(response);
  };

  const logout = () => {
    localStorage.removeItem(TOKENS_LOCAL_STORAGE_KEY);
    listeners.forEach((listener) => listener(null));
  };

  const refreshTokensPromiseRef = useRef<Promise<Tokens>>();
  const refreshTokens = () => {
    if (!refreshTokensPromiseRef.current) {
      const refreshTokenExpiryDate = new Date(tokens!.refreshToken.expiryDate);
      if (refreshTokenExpiryDate.getTime() < Date.now()) {
        logout();
        throw new Error('User\'s session has expired.');
      }

      refreshTokensPromiseRef.current = (async () => {
        try {
          const response = await fetch('/api/users/refresh-tokens', {
            headers: {
              authorization: 'Bearer ' + tokens?.refreshToken.token,
            },
          });
          return await handleAuthorizationResponse(response);
        } finally {
          refreshTokensPromiseRef.current = undefined;
        }
      })();
    }

    return refreshTokensPromiseRef.current;
  };

  const getAccessToken = async () => {
    if (!tokens) {
      throw new Error('User is not logged in.');
    }

    const now = Date.now();
    const refreshTokenExpiryDate = new Date(tokens.accessToken.expiryDate).getTime();

    if (refreshTokenExpiryDate > now) {
      if (refreshTokenExpiryDate - now < PROACTIVELY_REFRESH_TOKENS_BEFORE_EXPIRY_DATE_MS) {
        refreshTokens();
      }
      return tokens.accessToken.token;
    }

    const { accessToken } = await refreshTokens();
    return accessToken.token;
  };

  const isLoggedIn = !!tokens;

  return { isLoggedIn, register, login, logout, getAccessToken };
};
