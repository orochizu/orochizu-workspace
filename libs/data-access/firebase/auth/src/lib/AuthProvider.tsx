import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
  useCallback,
} from 'react';
import nookies from 'nookies';

import { environment } from '@orochizu-workspace/environment';
import { firebase } from '@orochizu-workspace/data-access/firebase/client';

interface Auth {
  user: firebase.User | null;
  handleSignIn: (email: string, password: string) => Promise<void>;
  handleSignOut: () => void;
}

const AuthContext = createContext<Auth>({
  user: null,
  handleSignIn: async (email: string, password: string) => {
    return;
  },
  handleSignOut: () => {
    return;
  },
});

export function AuthProvider({ children }: PropsWithChildren<unknown>) {
  const [user, setUser] = useState<firebase.User | null>(null);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  }, []);

  const handleSignOut = useCallback(() => {
    try {
      firebase.auth().signOut();
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, environment.token, '', environment.cookies);
        return;
      }

      const token = await user.getIdToken();
      setUser(user);
      nookies.set(undefined, environment.token, token, environment.cookies);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, handleSignIn, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
