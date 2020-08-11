import React, { useContext, useState } from "react";
import { Collapse, Radio } from "antd";
import { Link } from "react-router-dom";
import ENDPOINT from "../../ENDPOINT";
import axios from "axios";

import { UserContext } from "../../contexts/UserContext";
import { PostContext } from "../../contexts/PostContext";

import recommend from "../../public/images/recommend.png";
import "./SideBar.css";
const { Panel } = Collapse;

const SideBar = () => {
  const { currentUser, setErr } = useContext(UserContext);
  const { filterPost, setIsLoaded, setIsFilter } = useContext(PostContext);

  const [value, setValue] = useState("all");

  const onChange = (e) => {
    if (e.target.value !== "all") {
      setIsFilter(true);
    } else setIsFilter(false);

    setIsLoaded(false);
    setValue(e.target.value);
    axios
      .post(`${ENDPOINT}posts/filter`, {
        type: e.target.value
      })
      .then((res) => {
        filterPost(res.data.postsFiltered);
        setIsLoaded(true);
      })
      .catch((err) => setErr(err.response.data));
  };

  const data = [
    {
      headerTitle: "Loại hàng hóa",
      content: [
        { value: "all", title: "Tất cả" },
        { value: "skins", title: "Trang phục" },
        { value: "apparatus", title: "Đồ trang trí" },
        { value: "machines", title: "Máy móc - Đồ điện tử" },
        { value: "learningTools", title: "Học tập" },
        { value: "travels", title: "Du lịch - Phượt" },
        { value: "other", title: "Khác" }
      ]
    }
  ];

  return (
    <div className="sidebar d-none d-md-block">
      <div className="sidebar-field">
        {data.map((field, key) => (
          <Collapse defaultActiveKey={["0"]} ghost key={key}>
            <Panel header={field.headerTitle} key={key}>
              <Radio.Group onChange={onChange} value={value}>
                {field.content.map((props, key) => (
                  <Radio value={props.value} key={key}>
                    {props.title}
                  </Radio>
                ))}
              </Radio.Group>
            </Panel>
          </Collapse>
        ))}
        <div className="time-line">
          <img src={recommend} alt="" />
          <Link to="/posts-history">Time Line</Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
