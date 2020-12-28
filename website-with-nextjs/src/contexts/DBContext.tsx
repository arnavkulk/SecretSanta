import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";

interface State {
  collectionData: any,
  docData: any
}

const DBContext = createContext<State>({collectionData: [], docData: []});

export const useDB = (props: Props): State => useContext<State>(DBContext);

interface Props {
  children?: React.ReactNode;
  collectionPaths: string[];
  docPaths: string[];
}

export const DBProvider: React.FC<Props> = ({
  children,
  collectionPaths,
  docPaths,
}) => {
  const [collectionData, setCollectionData] = useState({});
  const [docData, setDocData] = useState({});

  useEffect(() => {
    let unsubscribes: Array<() => void> = [];
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

  let value: State = {
    collectionData,
    docData,
  };
  return <DBContext.Provider value={value}>{children}</DBContext.Provider>;
};
