import React, { useContext } from "react";
import GridLoader from "react-spinners/GridLoader";

import { ExchangeContext } from "../../contexts/ExchangeContext";
import { UserContext } from "../../contexts/UserContext";

import { ExchangeSent } from "../../components";
import { Notfind } from "../../assets/images";

import "./ExchangeProposalSent.css";

export default function () {
  const { exchanges, isLoaded } = useContext(ExchangeContext);
  const { currentUser } = useContext(UserContext);

  const exchangeListSent = exchanges.filter(
    (item) => item.sender === currentUser.username
  );

  if (!isLoaded) {
    return (
      <div className="home wrap-content">
        <div className="loading">
          <GridLoader />
        </div>
      </div>
    );
  }

  return (
    <div className="exchange-proposal-sent wrap-content">
      <div className="container">
        {exchangeListSent.length === 0 && (
          <div className="notfind">
            <p>Bạn chưa gửi đề xuất nào</p>
            <img src={Notfind} alt="" />
          </div>
        )}
        {exchangeListSent.length > 0 &&
          exchangeListSent.map((item, index) => (
            <ExchangeSent key={index} exchange={item} />
          ))}
      </div>
    </div>
  );
}
