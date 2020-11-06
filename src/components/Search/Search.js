import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";

import { ReactComponent as Search } from "../../assets/images/search.svg";
import { ReactComponent as Close } from "../../assets/images/close.svg";
import { ReactComponent as SearchImg } from "../../assets/images/search.svg";
import { EffectContext } from "../../contexts/EffectApp";
import { PostContext } from "../../contexts/PostContext";

import "./Search.css";

export default function () {
  const { allPost, filterPost } = useContext(PostContext);
  const { handleShowInputXS, isShowInputxs } = useContext(EffectContext);
  const [inputValue, setInputValue] = useState("");

  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();

    const post = allPost.filter((post) => post.postId === inputValue);
    filterPost(post);

    history.push("/");
  };

  return (
    <div className="site-action-search">
      <form onSubmit={onSubmit}>
        <div
          className={classNames({
            "input-xs-wrapper": true,
            show: isShowInputxs
          })}
        >
          <input
            placeholder="Tìm bài viết theo ID"
            className="input-xs"
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue.length === 0 && (
            <Close onClick={() => handleShowInputXS()} />
          )}
          {inputValue.length > 0 && (
            <SearchImg onClick={() => handleShowInputXS()} />
          )}
        </div>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input-bigger"
          placeholder="Tìm bài viết theo ID"
        />
        <button>
          <Search />
        </button>
        <div className="search-xs d-none">
          <button className="d-none btn-xs" onClick={() => handleShowInputXS()}>
            <Search />
          </button>
        </div>
      </form>
    </div>
  );
}
