import React from "react";
import { Link } from "react-router-dom";

import "./Guide.css";

import { Postb1, Postb2, Postb3, ExchangeB1, ExchangeB2 }from "../../assets/imagesGuide";

export default function () {
  return (
    <div className="guide wrap-content">
      <div className="container">
        <h3>Hướng dẫn sử dụng REI</h3>
        <div className="guide-content">
          <div className="guide-item">
            <h4>1. Đăng bài viết</h4>
            <div className="guide-content-item">
              <p>B1: Click vào nút màu xanh bên phải, phía dưới màn hình</p>
              <img src={Postb1} alt="" />
            </div>
            <div className="guide-content-item">
              <p>B2: Điền đầy đủ thông tin vào form</p>
              <img src={Postb2} alt="" />
            </div>
            <div className="guide-content-item">
              <p>B3: Click vào nút POST để hoàn tất việc đăng bài</p>
              <img src={Postb3} alt="" />
            </div>
          </div>
          <div className="guide-item">
            <h4>2. Thực hiện trao đổi</h4>
            <p className="guide-condition">
              Yêu cầu: bạn phải đăng bài viết bài gồm hàng hóa của bạn để thực
              hiện trao đổi
            </p>
            <div className="guide-content-item">
              <p>
                B1: Click vào nút trao đổi ở bên phải bài viết bạn cần trao đổi
              </p>
              <img src={ExchangeB1} alt="" />
            </div>
            <div className="guide-content-item">
              <p>B2: Điền đầy đủ thông tin vào form và nhấn Gửi yêu cầu</p>
              <img src={ExchangeB2} alt="" />
            </div>
            <p>
              - Sau khi người kia nhận được yêu cầu, nếu đồng ý trao đổi, yêu
              cầu sẽ được gửi đến Admin xác nhận.
            </p>
            <p className="mb-2">
              Bạn có thể xem
              <Link to="/transactions-history" className="ml-1">
                ở đây
              </Link>
            </p>
            <p>
              - Nếu Admin xác nhận, bộ phận giao hàng sẽ đến kiểm tra hàng hóa
              trước khi gửi và nhận chi phí (50.000VNĐ) để thực hiện trao đổi.
            </p>
          </div>
          <h5 className="mb-4">Cảm ơn bạn đã tin tưởng chúng tôi !!!</h5>
        </div>
      </div>
    </div>
  );
}
