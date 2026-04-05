import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  if (user) return <Dashboard user={user} />;

  return isSignup ? (
    <Signup
      setUser={setUser}
      switchToLogin={() => setIsSignup(false)}
    />
  ) : (
    <Login
      setUser={setUser}
      switchToSignup={() => setIsSignup(true)}
    />
  );
}