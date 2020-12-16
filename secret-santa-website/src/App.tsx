import React from "react";
import { db, auth } from "./firebase";

function App() {
  console.log(`CURRENT USER: ${auth.currentUser}`);
  return <div>HELLO WORLD</div>;
}

export default App;
