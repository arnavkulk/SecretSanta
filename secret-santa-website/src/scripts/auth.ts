import { auth } from "../firebase";
import firebase from "firebase";

export function signup(email, password): Promise<firebase.auth.UserCredential> {
  return auth.createUserWithEmailAndPassword(email, password);
}

export function login(email, password): Promise<firebase.auth.UserCredential> {
  return auth.signInWithEmailAndPassword(email, password);
}

export function logout(): Promise<void> {
  return auth.signOut();
}

export function resetPassword(email: string) {
  return auth.sendPasswordResetEmail(email)
}

export function updateEmail(currentUser: firebase.User, email: string) {
  return currentUser.updateEmail(email)
}

export function updatePassword(currentUser: firebase.User, password: string) {
  return currentUser.updatePassword(password)
}
