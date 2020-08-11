import React from "react";
import axios from "axios";

import ENDPOINT from "../ENDPOINT";

export const PostContext = React.createContext();

export class PostProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      swiperData: [],
      isLoaded: false,
      allPost: [],
      posts: [],
      isFilter: false
    };

    this.setIsFilter = this.setIsFilter.bind(this);
    this.setIsLoaded = this.setIsLoaded.bind(this);
    this.filterPost = this.filterPost.bind(this);
    this.setNewPosts = this.setNewPosts.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.addSwiperData = this.addSwiperData.bind(this);
    this.setDefaultSwiperData = this.setDefaultSwiperData.bind(this);
  }

  setIsLoaded(boo) {
    this.setState({
      isLoaded: boo
    });
  }

  setIsFilter(boo) {
    this.setState({
      isFilter: boo
    });
  }

  filterPost(posts) {
    this.setState({
      posts: posts
    });
  }

  setNewPosts(post, index) {
    const { posts, isFilter } = this.state;
    if (isFilter) {
      const indexPost = posts.findIndex((item) => item.postId === post.postId);
      this.setState({
        posts: [
          ...posts.slice(0, indexPost),
          post,
          ...posts.slice(indexPost + 1)
        ]
      });
      return;
    }

    this.setState({
      posts: [...posts.slice(0, index), post, ...posts.slice(index + 1)]
    });
  }

  handlePost(newPost) {
    this.setState({
      posts: [newPost, ...this.state.posts]
    });
  }

  addSwiperData(images) {
    this.setState({
      swiperData: images
    });
  }

  setDefaultSwiperData() {
    this.setState({
      swiperData: []
    });
  }

  componentDidMount() {
    axios
      .get(`${ENDPOINT}api/posts`)
      .then((res) => {
        this.setState({
          allPost: res.data,
          posts: res.data,
          isLoaded: true
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const {
      posts,
      isLoaded,
      swiperData,
      postUpdated,
      index,
      isFilter,
      allPost
    } = this.state;

    return (
      <PostContext.Provider
        value={{
          swiperData,
          isLoaded,
          posts,
          postUpdated,
          index,
          isFilter,
          allPost,
          setIsFilter: this.setIsFilter,
          setIsLoaded: this.setIsLoaded,
          filterPost: this.filterPost,
          setNewPosts: this.setNewPosts,
          handlePost: this.handlePost,
          addSwiperData: this.addSwiperData,
          setDefaultSwiperData: this.setDefaultSwiperData
        }}
      >
        {this.props.children}
      </PostContext.Provider>
    );
  }
}
