import { db } from "../firebase";
import firebase from "firebase";

export interface User {
  email?: string;
  desire?: string;
  personDesire?: string;
  dislike?: string;
  personDislike?: string;
  name?: string;
  userType?: string;
  person?: string;
}

export function addUser(id: string, info: User): Promise<void> {
  return db.collection("users").doc(id).set(info);
}

export function updateUserInfo(id: string, info: User): Promise<void> {
  return db.collection("users").doc(id).update(info);
}

export function getUser(
  id: string
): Promise<
  firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
> {
  return db.collection("users").doc(id).get();
}

export function addListener(
  path: string,
  onSnapshot: (
    snap: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
  ) => void
): () => void {
  return db.doc(path).onSnapshot(onSnapshot);
}

export function startDrawing(): Promise<void> {
  return db
    .collection("commands")
    .doc("commandCenter")
    .update({ state: "started" });
}

export async function resetDrawing(): Promise<void> {
  await db
    .collection("commands")
    .doc("commandCenter")
    .update({ state: "not started" });
  let users = await db.collection("users").get();
  let promises: Array<Promise<void>> = [];
  users.docs.forEach((doc) => {
    promises.push(
      doc.ref.update({ person: "", personDesire: "", personDislike: "" })
    );
  });
  await Promise.all(promises);
}
