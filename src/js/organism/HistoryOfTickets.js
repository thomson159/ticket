import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import firebase from "../../firebase";
import Nav from "../organism/Nav";
import Ticker from "../atom/Ticket";
import Back from "../atom/Back";

export default function HistoryOfTickets() {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState("loading");

  useEffect(() => {
    const ref = firebase.database().ref("users/" + currentUser.uid + "/history");

    ref.on("value", (snapshot) => {
      const list = snapshot.val();
      const ticketsFromBase = [];

      for (let id in list) {
        ticketsFromBase.push({ id, ...list[id] });
      }
      
      setTickets(ticketsFromBase);
    });
  }, [currentUser.uid]);

  return (
    <>
      <Nav />
      <div className="pl-2 pr-2 pb-4 pt-5 mainBg">
        <div className="row pt-4 boxPanel">
          <Back to="/" text="Powrót" />
        </div>
        <div className="col-12 pt-4 pb-4 pl-0 pr-0 boxPanel">
          <h5 className="mb-3 text-center">
            Moje bilety
          </h5>
          {tickets === "loading" ? (
            <div className="pl-3 pr-3">
              wczytywanie
            </div>
          ) : (
            <>
              {tickets.length === 0 &&
                <div className="pl-3 pr-3">
                  brak biletów
                </div>
              }
              {tickets.map((ticket, id) =>
                <Ticker key={id} ticket={ticket} />
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}
