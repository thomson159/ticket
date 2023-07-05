import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Navbar from "../molecular/Navbar";
import MenuImage from "../../assets/menu.svg";
import CookieConsent from "react-cookie-consent";

export default function Nav() {
  const { currentUser, logout } = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [menuIsOpen, setMenuStatus] = useState(false);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Nie udało się wylogować.");
    }
  }

  return (
    <>
      {error &&
        <Alert variant="danger" className="pr-3 pl-3 p-2 successInfo">
          {error}
        </Alert>
      }
      <div className="nav">
        <img alt="icon" src={MenuImage} className="menuButton" onClick={() => setMenuStatus(!menuIsOpen)} />
      </div>
      {menuIsOpen &&
        <Navbar
          currentUser={currentUser}
          handleLogout={handleLogout}
          menu={() => setMenuStatus(!menuIsOpen)}
        />
      }
      <CookieConsent
        location="bottom"
        buttonText="OK"
        cookieName="web2app-cookies"
        expires={150}>
        Ta strona korzysta z plików cookie, aby poprawić komfort użytkowania.
      </CookieConsent>
    </>
  )
}
