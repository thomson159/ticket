import React from "react";
import { Link } from "react-router-dom";

export default function Back({
  text,
  to
}) {
  return (
    <Link to={to ? to : '/'} className="backLink font-weight-bold">
      <div className='backText'>
        🚌 {text ? text : ''}
      </div>
    </Link>
  )
}
