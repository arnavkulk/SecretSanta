import React, { createContext, useContext, useState, useEffect } from "react";
import { isPropertySignature } from "typescript";
import { db } from "../firebase";

const FirestoreContext = createContext();

export const useFirestore: React.FC = () => useContext(FirestoreContext);

interface Props {
  children?: null;
  collectionPaths: string[];
  docPaths: string[];
}

export const FirestoreProvider: React.FC<Props> = ({
  children,
  collectionPaths,
  docPaths
}) => {
  const [collectionData, setCollectionData] = useState({});
  const [docData, setDocData] = useState({});

  useEffect(() => {
    let unsubscribes: any[] = [];
    collectionPaths.forEach((path) => {
      let unsubscribe = db.collection(path).onSnapshot((snap) => {
        let newCollectionData = collectionData;
        newCollectionData[path] = snap.docs;
        setCollectionData(newCollectionData);
      });
      unsubscribes.push(unsubscribe);
    });
    docPaths.forEach((path) => {
        let unsubscribe = db.doc(path).onSnapshot((snap) => {
          let newDocData = docData;
          newDocData[snap.id] = snap;
          setDocData(newDocData);
        });
        unsubscribes.push(unsubscribe);
      });
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  });

  let value = {
    collectionData,
    docData
  };
  return (
    <FirestoreContext.Provider value={value}>
      {children}
    </FirestoreContext.Provider>
  );
};
