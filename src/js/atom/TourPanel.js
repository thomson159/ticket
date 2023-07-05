import React from "react";

export default function TourPanel({
  title,
  className,
}) {
  return (
    <div className={"col-12 pt-3 pb-3 whitePanel " + className}>
      <h5 className="m-0">
        {title ? title : ""}
      </h5>
    </div>
  )
}
