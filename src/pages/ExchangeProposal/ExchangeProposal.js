import React, { useContext, useState, useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";

import { ExchangeContext } from "../../contexts/ExchangeContext";
import { UserContext } from "../../contexts/UserContext";

import Exchange from "../../components/Exchange/Exchange";

import Notfind from "../../assets/images/notfind2.png";
import "./ExchangeProposal.css";

export default function () {
  const { exchanges, isLoaded } = useContext(ExchangeContext);
  const { currentUser } = useContext(UserContext);

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(exchanges);

  useEffect(() => {
    const exchangesListOfUser = exchanges.filter(
      (item) =>
        item.viewer === currentUser.username && item.status === "WAITING"
    );

    setData(exchangesListOfUser);
    setLoaded(true);
  }, [currentUser, exchanges]);

  if (!isLoaded || !loaded) {
    return (
      <div className="home wrap-content">
        <div className="loading">
          <GridLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="exchange-proposal-list wrap-content">
      <div className="container">
        {data.length === 0 && (
          <div className="notfind">
            <p>Bạn chưa có yêu cầu nào :(</p>
            <img src={Notfind} alt="" />
          </div>
        )}
        {data.length > 0 &&
          data.map((item, index) => (
            <div>
              <h4>#{index + 1}</h4>
              <Exchange exchange={item} key={index} />
            </div>
          ))}
      </div>
    </div>
  );
}
