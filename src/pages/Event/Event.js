import React from "react";

import Notfind from "../../components/Notfind/Notfind";

export default function () {
  return (
    <div className="event">
      <h4
        className="text-center mt-4 text-uppercase"
        style={{ fontSize: "1rem", fontWeight: "bold" }}
      >
        Hiện chưa có sự kiện nào
      </h4>
      <Notfind />
    </div>
  );
}
