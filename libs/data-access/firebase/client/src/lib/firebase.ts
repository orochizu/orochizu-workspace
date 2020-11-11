import { createContext, useContext } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

type Firebase = typeof firebase;

const FirebaseContext = createContext<Firebase>(null);

export const FirebaseProvider = FirebaseContext.Provider;

export function firebaseInit(config: unknown): Firebase {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  return firebase;
}

export function useFirebase(): Firebase {
  return useContext(FirebaseContext);
}
