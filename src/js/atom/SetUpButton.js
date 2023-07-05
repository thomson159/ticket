import React from "react";

export default function SetUpButton({
  selected,
  thisOne,
  name,
  last,
  mySelect,
  backTime
}) {
  return (
    <div className="col-12 pt-3 pb-3 font-weight-bold cursorPointer borderTop" onClick={mySelect}
      style={{
        backgroundColor: thisOne === selected ? "#F6C324" : "white",
        borderBottomRightRadius: last ? 6 : 0,
        borderBottomLeftRadius: last ? 6 : 0,
        color: thisOne === selected ? "white" : "black",
      }}>
      {name}
      <br />
      powrót: {backTime}
    </div>
  )
}
