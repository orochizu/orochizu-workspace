const FIREBASE_PRIVATE_KEY = Buffer.from(
  process.env.NX_SERVER_FIREBASE_PRIVATE_KEY ?? '',
  'base64'
).toString();

export const environment = {
  api: process.env.NX_STATIC_API,
  token: process.env.NX_STATIC_TOKEN,
  public: {
    linkedIn: process.env.NX_STATIC_LINKED_IN_URL,
    facebook: process.env.NX_STATIC_FACEBOOK_URL,
    github: process.env.NX_STATIC_GITHUB_URL,
    next: process.env.NX_STATIC_NEXT_URL,
  },
  cookies: {
    domain: process.env.NX_STATIC_DOMAIN,
    path: process.env.NX_STATIC_PATH,
  },
  firebase: {
    bucket: process.env.NX_SERVER_FIREBASE_BUCKET,
    database: process.env.NX_STATIC_FIREBASE_DATABASE_URL,
    storage: process.env.NX_SERVER_STORAGE,
    admin: {
      type: process.env.NX_SERVER_FIREBASE_TYPE,
      project_id: process.env.NX_STATIC_FIREBASE_PROJECT_ID,
      private_key_id: process.env.NX_SERVER_FIREBASE_PRIVATE_KEY_ID,
      private_key: FIREBASE_PRIVATE_KEY,
      client_email: process.env.NX_SERVER_FIREBASE_CLIENT_EMAIL,
      client_id: process.env.NX_STATIC_FIREBASE_CLIENT_ID,
      auth_uri: process.env.NX_SERVER_FIREBASE_AUTH_URI,
      token_uri: process.env.NX_SERVER_FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url:
        process.env.NX_SERVER_FIREBASE_AUTH_PROVIDER_CERT_URL,
      client_x509_cert_url: process.env.NX_SERVER_FIREBASE_CLIENT_CERT_URL,
    },
    client: {
      apiKey: process.env.NX_STATIC_FIREBASE_API_KEY,
      authDomain: process.env.NX_STATIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.NX_STATIC_FIREBASE_DATABASE_URL,
      projectId: process.env.NX_STATIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NX_STATIC_FIREBASE_STORAGE,
      messagingSenderId: process.env.NX_STATIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NX_STATIC_FIREBASE_API_ID,
      measurementId: process.env.NX_STATIC_FIREBASE_MEASUREMENT_ID,
    },
  },
};
