import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function NewSeatsPanel({
  toursTable,
  peopleData,
  numberOfPassengers,
  setPeopleData,
  addSum
}) {
  const [numberOfTicket, setNumberOfTicket] = useState(numberOfPassengers);
  const [userMove, setUserMove] = useState(peopleData);

  const handleChangeInput = (id, event) => {
    const newInputFields = userMove.map(i => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setUserMove(newInputFields);
    setPeopleData(newInputFields);
  };

  return (
    <div className="col-12 pl-0 pr-0 mt-2 whitePanel">
      <div className="col-12 pt-3 pb-3">
        <h5 className="mb-0">
          🎟️ Bilet
        </h5>
      </div>
      <div className="col-12 p-0">
        <div className="pl-3 pr-3 pb-3 pt-3 borderTop">
          <input required={true}
            className="pt-2 pb-2 pl-3 pr-3 w-100 mb-3 formInput"
            placeholder="Ilość biletów"
            type="number"
            min="1"
            max={parseFloat(toursTable.freeSeats)}
            value={numberOfTicket}
            onChange={(event) => {
              // eslint-disable-next-line no-mixed-operators
              if (((/^[0-9]*$/i.test(event.target.value) && parseFloat(event.target.value) >= 0 && parseFloat(event.target.value) <= parseFloat(toursTable.freeSeats)) || event.target.value === "")) {
                setNumberOfTicket(event.target.value);
                addSum(event.target.value);
                setPeopleData([]);
                const x = [];
                for (let i = 0; i < event.target.value; i++) {
                  x.push({
                    id: uuidv4(),
                    firstName: "",
                    secondName: "",
                    dateOfBirth: "",
                    phone: "",
                  });
                }
                setUserMove(x);
              }
            }}
          />
          {userMove.map((userMove, i) => (
            <div key={i} className={"pt-2 borderTop " + (i < numberOfTicket - 1 ? "mb-3" : "")}>
              <label className="font-weight-bold">
                Pasażer nr {i + 1}
              </label>
              <br />
              <label>
                Imię i Nazwisko *
              </label>
              <div>
                <input required={true}
                  className="pt-2 pb-2 pl-3 pr-3 mb-2 formInput halfWidth"
                  type="text"
                  name="firstName"
                  value={userMove.firstName}
                  onChange={event => handleChangeInput(userMove.id, event)}
                  placeholder="Imię"
                />
                <input required={true}
                  className="pt-2 pb-2 pl-3 pr-3 mb-2 formInput halfWidth"
                  type="text"
                  name="secondName"
                  value={userMove.secondName}
                  onChange={event => handleChangeInput(userMove.id, event)}
                  placeholder="Nazwisko"
                />
              </div>
              <label>
                Data urodzenia * {userMove.dateOfBirth ? new Date(userMove.dateOfBirth).toLocaleString("pl-PL", {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                }) : null}
              </label>
              <input required={true}
                className="pt-2 pb-2 pl-3 pr-3 w-100 mb-2 formInput"
                type="date"
                min="1922-01-01"
                max="2022-01-01"
                name="dateOfBirth"
                value={userMove.dateOfBirth}
                onChange={event => handleChangeInput(userMove.id, event)}
                placeholder="Data urodzenia"
              />
              <label>
                Numer telefonu {i === 0 ? "*" : ""}
              </label>
              <input required={i === 0}
                className="pt-2 pb-2 pl-3 pr-3 w-100 formInput"
                name="phone"
                type="tel"
                minLength={9}
                maxLength={9}
                value={userMove.phone}
                onChange={(event) => {
                  if ((/^[0-9]*$/i.test(event.target.value) & parseFloat(event.target.value) >= 0 || event.target.value === "")) {
                    handleChangeInput(userMove.id, event);
                  }
                }}
                placeholder="+48"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
