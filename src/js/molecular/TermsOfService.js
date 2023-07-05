import React, { useState } from "react";
import NumberIcon from "../atom/NumberIcon";

export default function TermsOfService({
  text,
  error,
  termsAccepted
}) {
  const [iDontWantChoose, setIDontWantChoose] = useState(false);

  return (
    <div className="col-12 pt-3 pb-3 mt-2 termPanel" onClick={() => {
      setIDontWantChoose(!iDontWantChoose);
      termsAccepted(!iDontWantChoose);
    }}>
      <NumberIcon number={iDontWantChoose ? "✔️" : ""} />
      <div className="marginLeft" style={{ color: error ? "red" : "black", }}>
        {text}
      </div>
    </div>
  )
}
