import React from "react";

export default function MainPanel({
  toursTable,
  choose
}) {
  return (
    <div className="col-12 pt-3 pb-3 pl-0 pr-0 whitePanel">
      <div className="col-12 pb-3">
        <h3 className="m-0 font-weight-bold">
          {toursTable.name}
        </h3>
      </div>
      <div className="mainImage" style={{ backgroundImage: "url(" + toursTable.image + ")", }}>
      </div>
      <div className="col-12 pt-3">
        <h5 className="font-weight-bold">
          {toursTable.where}
        </h5>
        <div className="mb-2">
          <span className="font-weight-bold">
            {new Date(toursTable.startDate).toLocaleString("pl-PL", {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        <div className="mb-2">
          cena: <span className="font-weight-bold">{toursTable.price} zł</span>
        </div>
        <a href={toursTable.url} target="_blank" rel="noreferrer" className="blueLink">
          ℹ️ Więcej
        </a>
        {toursTable.active &&
          <>
            <div className="mb-3">
            </div>
            <button className="w-100 p-2 font-weight-bold chooseButton" onClick={() => choose()}>
              WYBIERZ
            </button>
          </>
        }
      </div>
    </div>
  )
}
