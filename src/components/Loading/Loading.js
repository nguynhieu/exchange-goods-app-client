import React from "react";
import GridLoader from "react-spinners/GridLoader";

import "./Loading.css";

export default function() {
  return (
    <div className="loading">
      <GridLoader />
    </div>
  );
}
