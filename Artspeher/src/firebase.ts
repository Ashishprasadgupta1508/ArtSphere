import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  type User,
  type Auth,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  type Firestore,
} from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';

import { collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDHWTMe101Rb0mU0OxXN1TPdsk6ZIDzccg',
  authDomain: 'artsphere-43082.firebaseapp.com',
  projectId: 'artsphere-43082',
  storageBucket: 'artsphere-43082.firebasestorage.app',
  messagingSenderId: '1092112391158',
  appId: '1:1092112391158:web:2af81237599b0ec78145d7',
  measurementId: 'G-V95XTWG45M',
};

const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export async function initFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const supported = await isSupported();
    return supported ? getAnalytics(app) : null;
  } catch {
    return null;
  }
}

export async function signInWithGoogle(): Promise<User | null> {
  try {
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await saveUserToFirestore(user);
    return user;
  } catch (error: any) {
    console.error('Google sign-in error:', error);

    const errorCode = error?.code ?? 'unknown_error';
    const errorMessage = error?.message ?? String(error);

    if (typeof window !== 'undefined') {
      // Show a helpful message to the user (and developer) with the exact error code.
      // This makes it easier to diagnose issues like missing authorized domains or OAuth misconfiguration.
      // eslint-disable-next-line no-alert
      alert(
        `Google sign-in error: ${errorCode} — ${errorMessage}.\n\nIf this persists on production, please add your domain to Firebase Auth authorized domains and verify Google OAuth credentials.`
      );
    }

    if (
      error?.code === 'auth/popup-blocked' ||
      error?.code === 'auth/operation-not-supported-in-this-environment' ||
      error?.code === 'auth/web-storage-unsupported' ||
      error?.code === 'auth/operation-not-allowed'
    ) {
      try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithRedirect(auth, provider);
      } catch (redirectError: any) {
        console.error('Google redirect fallback failed:', redirectError);
        if (typeof window !== 'undefined') {
          // eslint-disable-next-line no-alert
          alert(`Google redirect fallback failed: ${redirectError?.message ?? String(redirectError)}`);
        }
      }
    }

    return null;
  }
}

export async function saveUserToFirestore(user: User): Promise<void> {
  const userRef = doc(db, 'users', user.uid);
  await setDoc(
    userRef,
    {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      provider: 'google',
      lastLogin: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function getUserFromFirestore(uid: string) {
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
}

export async function updateUserProfile(uid: string, data: Record<string, any>) {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, data, { merge: true });
}

export async function createOrder(order: Record<string, any>): Promise<string> {
  const ordersCol = collection(db, 'orders');
  const orderRef = doc(ordersCol);
  await setDoc(orderRef, order);
  return orderRef.id;
}

export function onAuthStateChangedListener(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function signOutUser(): Promise<void> {
  return signOut(auth);
}

export { auth, db };
export default app;
