import firebase from 'firebase/app';
import 'firebase/auth';
import { environment } from '@orochizu-workspace/environment';

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(environment.firebase.client);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export { firebase };
