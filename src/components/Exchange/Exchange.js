import React, { useState, useContext } from "react";
import { Modal, Input } from "antd";

import { socket } from "../../services/socket";
import { adminApi } from '../../apis/adminApi';

import { UserContext } from "../../contexts/UserContext";
import { ExchangeContext } from "../../contexts/ExchangeContext";

import { ShowTime } from "../index";
import ENDPOINT from "../../ENDPOINT";
import "./Exchange.css";

export default function ({ exchange }) {
  const { setErr } = useContext(UserContext);
  const { updateExchange } = useContext(ExchangeContext);

  const {
    time,
    sender,
    viewer,
    senderPostId,
    viewerPostId,
    addressSender
  } = exchange;

  const [visibleAccept, setVisibleAccept] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [notifySuccess, setNotifySuccess] = useState(false);
  const [notifyDecline, setNotifydecline] = useState(false);

  const showModal = (visibleAccept, notifySuccess, notifyDecline) => {
    setVisibleAccept(visibleAccept);
    setNotifySuccess(notifySuccess);
    setNotifydecline(notifyDecline);
  };

  const handleOk = () => {
    setNotifySuccess(false);
  };

  const handleDecline = () => {
    setConfirmLoading(true);
    try {
      const data = adminApi.adminDecline({
        exchangeData: exchange
      });
      updateExchange(data.data.exchanges);
      setNotifydecline(false);
      setConfirmLoading(false);
    } catch(err) {
      setErr(err.response.data);
    }
  };

  const handleOkAccept = () => {
    setConfirmLoading(true);
    try {
      adminApi.adminAccept({
        exchangeData: exchange,
        addressViewer: address
      });
      socket.emit("user-accept-exchange", { viewer, sender });
      updateExchange(res.data.exchanges);
      setVisibleAccept(false);
      setConfirmLoading(false);
      setNotifySuccess(true);
    } catch(err) {
      setErr(err.response.data)
    }
  };

  const handleCancel = (visibleAccept, notifySuccess, notifyDecline) => {
    setVisibleAccept(visibleAccept);
    setNotifySuccess(notifySuccess);
    setNotifydecline(notifyDecline);
  };

  return (
    <div className="exchange">
      <Modal
        visible={visibleAccept}
        onOk={handleOkAccept}
        onCancel={() => handleCancel(false)}
        confirmLoading={confirmLoading}
        okButtonProps={{ disabled: address.length === 0 }}
      >
        <p>Bạn đồng ý trao đổi với người này ?</p>
        <p>
          Phí mà bạn sẽ đóng khi nhận được hàng là 50.000 VNĐ (chưa tính ship)
        </p>
        <Input
          placeholder="Nhập địa chỉ của bạn"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </Modal>
      <Modal
        visible={notifySuccess}
        onOk={handleOk}
        onCancel={() => handleCancel(false, false)}
        confirmLoading={confirmLoading}
      >
        <p>
          Chúc mừng bạn đã thực hiện trao đổi thành công, chúng tôi sẽ cố gắng
          thực hiện việc trao đổi sớm nhất
        </p>
      </Modal>
      <Modal
        visible={notifyDecline}
        onOk={handleDecline}
        onCancel={() => handleCancel(false, false)}
        confirmLoading={confirmLoading}
      >
        <p>Bạn thực sự muốn từ chối việc trao đổi này ?</p>
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
              Người gửi
            </th>
            <td>{sender}</td>
          </tr>
          <tr>
            <th scope="row" className="text-right">
              Hàng hóa đề xuất
            </th>
            <td>ID: {senderPostId}</td>
          </tr>
          <tr>
            <th scope="row" className="text-right">
              Bài viết của bạn
            </th>
            <td>ID: {viewerPostId}</td>
          </tr>
          <tr>
            <th scope="row" className="text-right">
              Địa chỉ người gửi
            </th>
            <td>{addressSender}</td>
          </tr>
          <tr>
            <th scope="row" className="text-right"></th>
            <td>
              <button onClick={() => showModal(true, false)}>Đồng ý</button>
              <button onClick={() => showModal(false, false, true)}>
                Từ chối
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
