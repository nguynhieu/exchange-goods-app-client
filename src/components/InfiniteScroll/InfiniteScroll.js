import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PulseLoader from "react-spinners/PulseLoader";

import "./InfiniteScroll.css";

export default function({ posts, render }) {
  const [postRender, setPostRender] = useState(posts.slice(0, 9));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (postRender.length === posts.length) {
      setHasMore(false);
      return;
    }

    // 10 more records in 1 secs
    setTimeout(() => {
      setPostRender(
        postRender.concat(
          posts.slice(postRender.length - 1, postRender.length + 9)
        )
      );
    }, 1000);
  };

  return (
    <InfiniteScroll
      dataLength={postRender.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<PulseLoader />}
    >
      {postRender.map(item => render(item))}
    </InfiniteScroll>
  );
}
