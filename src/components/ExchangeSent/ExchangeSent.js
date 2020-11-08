import React, { useState, useContext } from "react";
import axios from "axios";
import { Modal } from "antd";

import { ExchangeContext } from "../../contexts/ExchangeContext";
import { UserContext } from "../../contexts/UserContext";

import { ShowTime } from "../";
import ENDPOINT from "../../ENDPOINT";
import "./ExchangeSent.css";

export default function ({ exchange }) {
  const { updateExchange } = useContext(ExchangeContext);
  const { setErr } = useContext(UserContext);

  const { time, viewer, senderPostId, viewerPostId } = exchange;
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    axios
      .post(`${ENDPOINT}exchanges/decline-exchange`, {
        exchangeData: exchange
      })
      .then((res) => {
        updateExchange(res.data.exchanges);
        setVisible(false);
        setConfirmLoading(false);
      })
      .catch((err) => setErr(err.response.data));
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div className="exchange-sent">
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Bạn có chắc muốn hủy đề xuất này không ?</p>
      </Modal>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" className="text-right">
              Thời gian
            </th>
            <th scope="col">
              <ShowTime time={time} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row" className="text-right">
              Người nhận đề xuất
            </th>
            <td>{viewer}</td>
          </tr>
          <tr>
            <th scope="row" className="text-right">
              Bài viết của bạn
            </th>
            <td>ID: {senderPostId}</td>
          </tr>
          <tr>
            <th scope="row" className="text-right">
              Hàng hóa yêu cầu
            </th>
            <td>ID: {viewerPostId}</td>
          </tr>
          <tr>
            <th scope="row" className="text-right"></th>
            <td>
              <button onClick={() => showModal()}>Hủy</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
