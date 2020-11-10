import React, { useState, useContext } from "react";
import classNames from "classnames";
import { Upload, Select, Input } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

import ENDPOINT from "../../ENDPOINT";
import { EffectContext } from "../../contexts/EffectApp";
import { UserContext } from "../../contexts/UserContext";
import { PostContext } from "../../contexts/PostContext";
import { Closer } from "../../assets/images";

import "./CreatePost.css";

const { TextArea } = Input;
const { Option } = Select;

const CreatePost = () => {
  const { currentUser, setErr } = useContext(UserContext);
  const { isShowLayer, handleShowLayer } = useContext(EffectContext);
  const { handlePost } = useContext(PostContext);

  const [content, setContent] = useState("");
  const [typeGoods, setTypeGoods] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [waitingPosted, setWaitingPosted] = useState(false);
  const [address, setAddress] = useState("");

  // custom request
  const onUpload = ({ file, onSuccess }) => {
    const reader = new window.FileReader();
    reader.readAsDataURL(file);
    reader.onload = (...args) => {
      // const fileContents = reader.result;
      onSuccess("done", file);
    };
  };

  const onChangeSelect = (value) => {
    setTypeGoods(value);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setWaitingPosted(true);
    const data = new FormData();
    const fileUrls = fileList.map((file) => file.thumbUrl);
    data.append("caption", content);
    data.append("type", typeGoods);
    data.append("userId", currentUser._id);
    data.append("avatar", currentUser.avatar);
    data.append("username", currentUser.username);
    data.append("time", new Date());
    data.append("status", "WAITING");
    data.append("address", address);
    fileUrls.forEach((file) => data.append("files", file));

    axios
      .post(`${ENDPOINT}posts`, data)
      .then((res) => {
        handlePost(res.data.newPost);
        setAddress("");
        setWaitingPosted(false);
        setContent("");
        setFileList([]);
        setTypeGoods(null);
        handleShowLayer();
      })
      .catch((err) => {
        setErr(err.response.data);
        setWaitingPosted(false);
        handleShowLayer();
      });
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div className="create-post">
      {isShowLayer && (
        <form onSubmit={onSubmit} encType="multipart/form-data">
          <div className="create-post-form">
            <div className="create-post-header">
              <div>
                {/* <img src={}/> */}
                <h4>Tạo bài viết</h4>
              </div>
              <button onClick={() => handleShowLayer()} className="closer">
                <Closer />
              </button>
            </div>
            <div className="create-post-body">
              <TextArea
                onChange={(e) => setContent(e.target.value)}
                name="content"
                value={content}
                placeholder="Viết thêm thông tin..."
                autoSize={{ minRows: 2, maxRows: 6 }}
              />
              <Select
                showSearch
                placeholder="Lựa chọn loại hàng"
                optionFilterProp="children"
                onChange={onChangeSelect}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="skins">Trang phục</Option>
                <Option value="apparatus">Đồ trang trí</Option>
                <Option value="machines">Máy móc - Đồ điện tử</Option>
                <Option value="learningTools">Học tập</Option>
                <Option value="travels">Du lịch - Phượt</Option>
                <Option value="other">Khác</Option>
              </Select>
              <Input value={address} placeholder="Địa chỉ của bạn" onChange={(e) => setAddress(e.target.value)}/>
              <ImgCrop rotate>
                <Upload
                  action=""
                  customRequest={onUpload}
                  name="photos"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 6 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div>

            <button
              className={classNames({
                "post-btn": true,
                show: content.length > 0 && typeGoods && address
              })}
            >
              {!waitingPosted && "Đăng bài"}
              {waitingPosted && <PulseLoader />}
            </button>
          </div>
        </form>
      )}
      <button className="create-post-icon" onClick={() => handleShowLayer()}>
        +
      </button>
    </div>
  );
};

export default CreatePost;
