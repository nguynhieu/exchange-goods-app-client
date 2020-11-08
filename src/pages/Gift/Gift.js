import React from "react";

import { Notfind } from "../../components";

export default function () {
  return (
    <div className="gift">
      <h4
        className="text-center mt-4 text-uppercase"
        style={{ fontSize: "1rem", fontWeight: "bold" }}
      >
        Hiện chưa có quà tặng nào
      </h4>
      <Notfind />
    </div>
  );
}
