import React, { useContext } from 'react'

import { PostContext } from '../../contexts/PostContext'

import { Post, SideBar, Loading } from '../../components'
import { Notfind } from '../../assets/images'

import './Home.css'

const Home = () => {
  const { posts, isLoaded } = useContext(PostContext)

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
    )
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
          {posts.length > 0 && posts.map((post, index) => <Post key={index} post={post} />)}
        </div>
      </div>
    </div>
  )
}

export default Home
