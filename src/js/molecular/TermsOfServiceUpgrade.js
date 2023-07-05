import React, { useState } from "react";
import NumberIcon from "../atom/NumberIcon";

export default function TermsOfServiceUpgrade({
  text,
  termsAccepted,
  iDontWantChoose
}) {
  const [iDontWant, setIDontWant] = useState(iDontWantChoose);

  return (
    <div className="col-12 pt-3 pb-3 mt-2 termPanel" onClick={() => {
      setIDontWant(!iDontWant);
      termsAccepted(!iDontWant);
    }}>
      <NumberIcon number={iDontWant ? "✔️" : ""} />
      <div className="marginLeft">
        {text}
      </div>
    </div>
  )
}
