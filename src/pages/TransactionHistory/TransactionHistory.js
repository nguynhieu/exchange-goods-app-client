import React, { useContext } from "react";
import GridLoader from "react-spinners/GridLoader";

import { ExchangeContext } from "../../contexts/ExchangeContext";
import { UserContext } from "../../contexts/UserContext";

import ShowTime from "../../components/ShowTime/ShowTime";

import Notfind from "../../assets/images/notfind2.png";
import "./TransactionHistory.css";

export default function () {
  const { exchanges, isLoaded } = useContext(ExchangeContext);
  const { currentUser } = useContext(UserContext);

  const transactions = exchanges.filter(
    (item) =>
      (item.sender === currentUser.username && item.status === "SUCCESS") ||
      (item.sender === currentUser.username && item.status === "FAILED") ||
      (item.viewer === currentUser.username && item.status === "SUCCESS") ||
      (item.viewer === currentUser.username && item.status === "FAILED")
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
    <div className="transactions-history wrap-content">
      <div className="container">
        {transactions.length === 0 && (
          <div className="notfind">
            <p>Bạn chưa có giao dịch nào</p>
            <img src={Notfind} alt="" />
          </div>
        )}
        {transactions.length > 0 && (
          <div className="table-wrap">
            <table className="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Thời gian</th>
                  <th scope="col">Trang thái</th>
                  <th scope="col">Lí do bị hủy</th>
                  <th scope="col">Người yêu cầu</th>
                  <th scope="col">Người nhận yêu cầu</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{item._id}</th>
                    <td>
                      <ShowTime time={item.time} />
                    </td>
                    {item.status === "SUCCESS" && (
                      <td className="success">
                        <p>{item.status}</p>
                      </td>
                    )}
                    {item.status === "FAILED" && (
                      <td className="failed">
                        <p>{item.status}</p>
                      </td>
                    )}
                    {item.status === "SUCCESS" && <td>__</td>}
                    {item.status === "FAILED" && <td>{item.reasonCancel}</td>}
                    <td>{item.sender}</td>
                    <td>{item.viewer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
