import React, { useContext } from "react";

import { PostContext } from "../../contexts/PostContext";

import Post from "../../components/Post/Post";
import SideBar from "../../components/SideBar/SideBar";
import Loading from "../../components/Loading/Loading";

import Notfind from "../../assets/images/notfind.png";

import "./Home.css";

const Home = () => {
  const { posts, isLoaded } = useContext(PostContext);

  if (!isLoaded) {
    return (
      <div className="home wrap-content">
        <div className="container d-block d-md-flex">
          <div className="main">
            <div className="home wrap-content">
              <Loading />
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    );
  }

  return (
    <div className="home wrap-content">
      <div className="container d-block d-md-flex">
        <div className="main">
          {posts.length === 0 && (
            <div className="notfind">
              <p>Chưa có bài viết nào</p>
              <img src={Notfind} alt="" />
            </div>
          )}
          {posts.length > 0 &&
            posts.map((post, index) => <Post key={index} post={post} />)}
        </div>
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
