// Import firebase admin sdk for interaction with firebase services
const admin = require("firebase-admin");

// Loading enivronment variables from .env file
require("dotenv").config();

// The credentials for firebase project
const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

// Initialise the firebase admin sdk with the service credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Export admin to interact with firebase services
module.exports = admin;
