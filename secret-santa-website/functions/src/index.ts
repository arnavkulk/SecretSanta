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
      let histories = await admin.firestore().collection("history").get();
      let history = await pairSantas(users.docs, histories.docs);
      await admin
        .firestore()
        .collection("history")
        .doc(new Date().getFullYear().toString())
        .set(history);
      await change.after.ref.update({ state: "released" });
    }
  });

async function pairSantas(
  participants: Array<DocumentSnapshot>,
  histories: Array<DocumentSnapshot>
): Promise<Object> {
  try {
    let resp: any = {};
    let remainingSantas = [...participants];
    for (let i = 0; i < participants.length; i++) {
      let participant = participants[i];
      let randomIndex = Math.floor(Math.random() * remainingSantas.length);
      let santa = remainingSantas[randomIndex];
      let alreadyHad = hasHadBefore(participant.id, santa.id, histories);

      while (santa.id === participant.id || alreadyHad) {
        randomIndex = Math.floor(Math.random() * remainingSantas.length);
        santa = remainingSantas[randomIndex];
        alreadyHad = hasHadBefore(participant.id, santa.id, histories);
      }
      
      const { name, desire, dislike } = santa.data() as User;

      await participant.ref.update({
        person: name,
        personDesire: desire,
        personDislike: dislike,
      });
      resp[participant.id] = santa.id;
      remainingSantas.splice(randomIndex, 1);
    }
    return resp;
  } catch (error) {
    console.log(error);
  }
  return {};
}

function hasHadBefore(
  person: string,
  santa: string,
  histories: DocumentSnapshot[]
): boolean {
  let resp = false;
  histories.forEach((doc) => {
    let data = doc.data() !== undefined ? doc.data() : {};
    if (data) {
      if (data[person] === santa) {
        resp = true;
      }
    }
  });
  return resp;
}

interface User {
  name: string;
  desire: string;
  personDesire: string;
  email: string;
  person: string;
  dislike: string;
  personDislike: string;
}
