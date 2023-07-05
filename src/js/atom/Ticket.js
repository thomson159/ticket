import React from "react";
import { Alert } from "react-bootstrap";
import QRCode from "react-qr-code";

export default function Ticket({
  ticket,
  turnOffQr,
  turnOffAlert,
  index
}) {
  return (
    <div key={index} className="w-100 p-3 mt-2 whitePanel">
      {ticket.id &&
        <>
          <h5 className="m-0">
            <span className="font-weight-normal">ID:</span> {ticket.id}
          </h5>
          <div className="pb-2">
            {ticket.createDate}
          </div>
        </>
      }
      {!turnOffAlert && ticket.status &&
        <Alert variant="warning" className="pt-2 pb-2 pl-3">
          {ticket.status}
        </Alert>
      }
      <div className="m-0 font-weight-bold">
        {ticket.name}
      </div>
      <div>
        {ticket.where}
      </div>
      <div>
        {new Date(ticket.startDate).toLocaleString("pl-PL", {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </div>
      <div className="mb-2">
        {ticket.station}
        <br />
        powrót: {ticket.backTime}
      </div>
      {ticket.peopleData.map((peopleData, id) =>
        <div key={id} className="mb-2">
          {peopleData.firstName} {peopleData.secondName}
          <br />
          {new Date(peopleData.dateOfBirth).toLocaleString("pl-PL", {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
          <br />
          {peopleData.phone}
        </div>
      )}
      <h2 className="mt-2 mb-2">
        cena: {!ticket.higherPrice ? ticket.sum : ticket.sum + (0.028 * ticket.sum)} zł
      </h2>
      {ticket.higherPrice &&
        <div className="mb-2">
          ubezpieczony
        </div>
      }
      {!turnOffQr &&
        <QRCode value={JSON.stringify(ticket)} />
      }
    </div>
  )
}
