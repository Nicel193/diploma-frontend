import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import Register from '../components/Register';
import Login from '../components/Login';
import "./Auth.sass";

function Auth() {
  const location = useLocation();
  const state = new URLSearchParams(location.search).get("state");
  const [activeTab, setActiveTab] = useState<boolean>(true);

  useEffect(() => {
    setActiveTab(state === "login");
  }, [state]);

  function setTab(): void {
    setActiveTab(prev => !prev);
  }

  return (
    <div className="auth-style">
      <div className={`container ${activeTab ? "active" : ""}`}>
        <div className="forms">
          <Login />
          <Register />
        </div>

        <div className="login-signup">
          <span className="text">
            {(!activeTab ? "Not a member?" : "Already a member?") + " | "}
            <span className="text signup-link" onClick={setTab}>
              {!activeTab ? "Register now" : "Login now"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Auth;