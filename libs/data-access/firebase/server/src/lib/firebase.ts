import firebaseAdmin, { ServiceAccount } from 'firebase-admin';
import 'firebase/auth';
import { environment } from '@orochizu-workspace/environment';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      environment.firebase.admin as ServiceAccount
    ),
    databaseURL: environment.firebase.database,
  });
}

export { firebaseAdmin };
