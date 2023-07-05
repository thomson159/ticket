import React, { useState } from "react";
import SetUpButton from "../atom/SetUpButton";
import ArrowDownImage from "../../assets/arrowDown.svg";

export default function ReceptionVenue({
  stations,
  choosenStation,
  setChoosenStation
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="col-12 pl-0 pr-0 mt-2 whitePanel">
      <div className="col-12 pt-3 pb-3 cursorPointer" onClick={() => setIsOpen(!isOpen)}>
        <h5 className="mb-0">
          🚏 Przystanek
        </h5>
        <img className="arrowIcon" alt="icon" src={ArrowDownImage} style={{ transform: isOpen ? "" : "rotate(270deg)" }} />
      </div>
      <div className="col-12 p-0">
        {isOpen &&
          <>
            {stations.map((station, index) =>
              <SetUpButton
                key={index}
                last={index === stations.length - 1}
                name={station.time + " " + station.station}
                backTime={station.backTime}
                thisOne={index}
                selected={choosenStation}
                mySelect={() => {
                  setChoosenStation(index);
                }}
              />
            )}
          </>
        }
      </div>
    </div>
  )
}
