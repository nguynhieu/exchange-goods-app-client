import React from "react";

import { Notfound } from "../../assets/images";

export default function () {
  return (
    <div
      className="page-notfound"
      style={{ backgroundImage: `url(${Notfound})` }}
    ></div>
  );
}
