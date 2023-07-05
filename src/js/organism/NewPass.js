import React, { useRef, useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Back from "../atom/Back";

export default function NewPass() {
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Hasła nie pasują do siebie");
    }

    if (passwordRef.current.value.length < 6 || passwordConfirmRef.current.value.length < 6) {
      return setError("Hasło powinno mieć co najmniej 6 znaków");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    };

    Promise.all(promises)
      .then(() => {
        history.push("/");
      }).catch((e) => {
        if (e.message === "This operation is sensitive and requires recent authentication. Log in again before retrying this request.") {
          setError("Ta operacja jest wrażliwa i wymaga niedawnego uwierzytelnienia. Zaloguj się ponownie przed ponowną próbą tego żądania.");
        } else {
          setError(e.message);
        }
      }).finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="pl-2 pr-2 mainBg">
      <div className="row pt-4 boxPanel">
        <Back to="/" text="Powrót" />
        <div className="col-12 pt-4 pb-4 pl-0 pr-0 mt-2 whitePanel" >
          <div className="col-12 pl-3 pr-3">
            <h5 className="mb-3 text-center">
              Zmiana hasła
            </h5>
            {error &&
              <Alert variant="danger"
                className="p-2 pl-3 pr-3">
                {error}
              </Alert>
            }
            <Form onSubmit={handleSubmit}>
              <Form.Group id="password" className="mb-3 position-relative">
                <div className="passIcon">
                  🔐
                </div>
                <div className="mb-3 font-weight-bold passInputDiv">
                  <input placeholder="nowe hasło"
                    autoComplete="off"
                    className="pt-2 pb-2 pl-3 pr-3 w-100 formInput"
                    type="password"
                    ref={passwordRef}
                  />
                </div>
              </Form.Group>
              <Form.Group id="password-confirm" className="mb-3 position-relative">
                <div className="passIcon">
                  🔐
                </div>
                <div className="mb-3 font-weight-bold passInputDiv">
                  <input placeholder="powtórz nowe hasło"
                    autoComplete="off"
                    className="pt-2 pb-2 pl-3 pr-3 w-100 formInput"
                    type="password"
                    ref={passwordConfirmRef}
                  />
                </div>
              </Form.Group>
              <button disabled={loading} className="w-100 p-2 mt-3 formButton" type="submit">
                ZMIEŃ HASŁO
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
