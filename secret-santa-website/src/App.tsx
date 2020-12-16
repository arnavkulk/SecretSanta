import React from "react";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div>HELLO WORLD</div>
    </AuthProvider>
  );
}

export default App;
