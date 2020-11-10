import React, { useContext, useState, useEffect } from "react";
import GridLoader from "react-spinners/GridLoader";
import { Route, Link, useLocation, Redirect } from "react-router-dom";
import { Modal, Input } from "antd";

import { chatApi, adminApi } from '../../apis';

import { ExchangeContext } from "../../contexts/ExchangeContext";
import { UserContext } from "../../contexts/UserContext";
import { ChatContext } from "../../contexts/ChatContext";

import { ShowTime } from "../../components";
import { Transaction, Help } from "../../assets/images";

import "./ManagerTransaction.css";

export default function () {
  const { chats, updateChat } = useContext(ChatContext);
  const { exchanges, isLoaded, updateExchange } = useContext(ExchangeContext);
  const { setErr, currentUser } = useContext(UserContext);

  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState(null);
  const [atChildComponent, setAtChildComponent] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reasonCancel, setReasonCancel] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);

  let location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/").length === 3) {
      setAtChildComponent(true);
    } else setAtChildComponent(false);
  }, [location]);

  useEffect(() => {
    const listExchangeAccepted = exchanges.filter(
      (item) => item.status === "ACCEPTED"
    );

    setData(listExchangeAccepted);
    setLoaded(true);
  }, [exchanges]);

  const setReadChat = async () => {
    try {
      const data = await chatApi.setReadChat();
      updateChat(data.data.chats)
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async (exchangeData) => {
    setConfirmLoading(true);
    try {
      const data = await adminApi.adminDecline({
        reasonCancel,
        exchangeData
      });

      updateExchange(data.exchanges);
      setConfirmLoading(false);
    } catch (err) {
      setErr(err.response.data);
    }
    
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
    setReasonCancel("");
  };

  const adminAccept = async (exchangeData) => {
    try {
      const data = await adminApi.adminAccept({ exchangeData });
      updateExchange(data.data.exchanges);
    } catch (err) {
      setErr(err.response.data)
    }
  };

  if (currentUser && currentUser.isAdmin === false) {
    return <Redirect to="/"/>
  }

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
    <div className="manager-transaction wrap-content">
      <div className="container">
        <div className="manager-header">
          <h3>Administrator</h3>
          <p>
            Quản lý các yêu cầu giao dịch và trợ giúp người dùng cần sự giúp đỡ
            của bạn
          </p>
        </div>
        <div className="manager-body">
          {!atChildComponent && (
            <div className="manager-body-link">
              <Link to="/manager-transactions/request-exchange">
                <div className="manager-body-cart">
                  <img src={Transaction} alt="" />
                  <div className="manager-cart-content transaction">
                    <div className="manager-cart-content-wrap ">
                      <div className="manager-cart-blur"></div>
                      <p>Bạn có {data.length} yêu cầu giao dịch chưa xử lí</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/manager-transactions/help" onClick={setReadChat}>
                <div className="manager-body-cart">
                  <img src={Help} alt="" />
                  <div className="manager-cart-content helper">
                    <div className="manager-cart-content-wrap">
                      <div className="manager-cart-blur"></div>
                      <p>
                        Bạn có{" "}
                        {chats.filter((chat) => chat.isRead === false).length}{" "}
                        phản hồi từ người dùng chưa xem
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
          {atChildComponent && (
            <Link className="manager-back" to="/manager-transactions">
              Quay lại trang trước
            </Link>
          )}
          <Route exact path="/manager-transactions/request-exchange">
            <div className="request-exchange">
              <div className="request-exchange-item">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">STT</th>
                      <th scope="col">Người gửi đề xuất</th>
                      <th scope="col">ID bài viết</th>
                      <th scope="col">người nhận đề xuất</th>
                      <th scope="col">ID bài biết</th>
                      <th scope="col">Time</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.sender}</td>
                        <td>{item.senderPostId}</td>
                        <td>{item.viewer}</td>
                        <td>{item.viewerPostId}</td>
                        <td>
                          <ShowTime time={item.time} />
                        </td>
                        <td>
                          <button
                            onClick={() => adminAccept(item)}
                            className="mr-2"
                            type="primary"
                          >
                            Chấp nhận
                          </button>
                          <button
                            className="btn-cancel"
                            onClick={() => showModal()}
                          >
                            Hủy bỏ
                          </button>
                          <Modal
                            title=""
                            okButtonProps={{
                              disabled: reasonCancel.length === 0
                            }}
                            visible={visible}
                            onOk={() => handleOk(item)}
                            onCancel={handleCancel}
                            confirmLoading={confirmLoading}
                          >
                            <Input
                              placeholder="Lí do hủy bỏ"
                              onChange={(e) => setReasonCancel(e.target.value)}
                            />
                          </Modal>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Route>
        </div>
      </div>
    </div>
  );
}
