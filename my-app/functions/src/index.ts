import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";

admin.initializeApp();

export const handleCommand = functions.firestore
  .document("commands/{commandID}")
  .onUpdate(async (change, context) => {
    let state: string = change.after.data().state;
    if (state === "started") {
      let users = await admin.firestore().collection("users").get();
      await pairSantas(users.docs);
      await change.after.ref.update({ state: "released" });
    }
  });

async function pairSantas(
  participants: Array<DocumentSnapshot>
): Promise<void> {
  try {
    let remainingSantas = [...participants];
    for (let i = 0; i < participants.length; i++) {
      let participant = participants[i];
      let randomIndex = Math.floor(Math.random() * remainingSantas.length);
      let santa = remainingSantas[randomIndex];

      while (santa.id === participant.id) {
        randomIndex = Math.floor(Math.random() * remainingSantas.length);
        santa = remainingSantas[randomIndex];
      }
      const { name, desire } = santa.data() as User;

      await participant.ref.update({ person: name, personDesire: desire });

      remainingSantas.splice(randomIndex, 1);
    }
  } catch (error) {
    console.log(error);
  }
}

interface User {
  name: string;
  desire: string;
  personDesire: string;
  email: string;
  person: string;
}
