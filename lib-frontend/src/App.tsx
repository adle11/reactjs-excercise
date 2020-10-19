import React, { useState } from 'react';
import { LoginView } from "./Components/LoginView";
import { MainView } from "./Components/MainView";
import { APP_CONFIG } from './Config';
import { UserRole } from "./Model/User";

const App: React.FC = () => {
  const [userId, setUserId] = useState<number>(-1);
  const [userRole, setUserRole] = useState<UserRole>();
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const handleLogin = async (username: string, password: string) => {
    const body = JSON.stringify({ username: username, password: password });
    const res = await fetch(APP_CONFIG.endpointAddress + "/token", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body });
    const content = await res.json();

    if (content['status'] === "success") {
      localStorage.setItem("token", content['token'])
      setUserId(content['userId'])
      setUserRole(content['userRole'])
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem("token")
    setAuthenticated(false)
  }

  return authenticated ? <MainView userId={userId} userRole={userRole} onLogout={handleLogout} /> : <LoginView onLogin={handleLogin} />;

}


export default App;