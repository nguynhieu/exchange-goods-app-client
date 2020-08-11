import React, { useContext } from "react";
import { Timeline } from "antd";
import { Link } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";

import { PostContext } from "../../contexts/PostContext";
import ShowTime from "../../components/ShowTime/ShowTime";
import InfiniteScroll from "../../components/InfiniteScroll/InfiniteScroll";

import "./PostToday.css";

const PostToday = () => {
  const { posts, isLoaded } = useContext(PostContext);

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
    <div className="post-today wrap-content container">
      <Timeline>
        <InfiniteScroll
          posts={posts}
          render={post => (
            <Timeline.Item>
              <Link to="/">#{post.postId}</Link> <span>{post.username}</span>{" "}
              posted an article <ShowTime time={post.time} />
            </Timeline.Item>
          )}
        />
      </Timeline>
    </div>
  );
};

export default PostToday;
