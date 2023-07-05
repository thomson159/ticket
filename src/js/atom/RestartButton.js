import React from "react";

export default function RestartButton({
  restartApp
}) {
  return (
    <span className="font-weight-bold cursorPointer" onClick={() => restartApp()}>
      🚌 Powrót
    </span>
  )
}
