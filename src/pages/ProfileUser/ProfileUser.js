import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { Route, Link, useHistory } from 'react-router-dom'
import classNames from 'classnames'

import { UserContext } from '../../contexts/UserContext'
import { PostContext } from '../../contexts/PostContext'
import { ExchangeContext } from '../../contexts/ExchangeContext'

import { Loading, Post } from '../../components'
import { Notfound } from '../'

import { BackgroundRepeat } from '../../assets/images'

import './ProfileUser.css'
import ENDPOINT from '../../ENDPOINT'
import { Button, Input } from 'antd'

export default function (props) {
  const params = props.match.params.userId

  const { setErr } = useContext(UserContext)
  const { posts, isLoaded } = useContext(PostContext)
  const { exchanges } = useContext(ExchangeContext)

  const [pathname, setPathname] = useState('')
  const [postsOfUser, setPostsOfUser] = useState(null)
  const [errApi, setErrApi] = useState(false)
  const [userInfor, setUserInfor] = useState(null)
  const [userForm, setUserForm] = useState(null)
  const [isLoadedUser, setIdLoadedUser] = useState(false)

  const history = useHistory()

  useEffect(() => {
    setPathname(window.location.href.split('/')[5])
    // console.log(pathname);
  }, [window.location.href])

  useEffect(() => {
    // filter post of user
    if (isLoaded && isLoadedUser && userInfor) {
      const postFiltered = posts.filter((post) => post.userId === userInfor._id)
      setPostsOfUser(postFiltered)
    }

    axios
      .get(`${ENDPOINT}api/users/${params}`)
      .then((res) => {
        setUserInfor(res.data.user)
        setUserForm(res.data.user)
        setIdLoadedUser(true)
      })
      .catch((err) => {
        if (err.response?.data === 'jwt must be provided') {
          setErr('You need login first')
        } else setErr(err.response?.data)
        setErrApi(true)
        setIdLoadedUser(true)
      })
  }, [params, setErr, posts, isLoaded, isLoadedUser])

  if (!isLoadedUser) {
    return (
      <div className="profile wrap-content">
        <Loading />
      </div>
    )
  }

  if (errApi) {
    return (
      <div className="profile wrap-content">
        <Notfound />
      </div>
    )
  }

  const handleChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value })
  }

  const handleUpdateUser = () => {
    const updateUserApi = async () => {
      try {
        const { isBlocked, ...data } = userForm

        await axios.put(`${ENDPOINT}api/users/${params}`, data)
        const {
          data: { user }
        } = await axios.get(`${ENDPOINT}api/users/${params}`)
        setUserInfor(user)
        setUserForm(user)
      } catch (err) {
        if (err.response?.data === 'jwt must be provided') {
          setErr('You need login first')
        } else setErr(err.response?.data)
        setErrApi(true)
        setIdLoadedUser(true)
      }
    }

    updateUserApi()
  }

  return (
    <div className="profile wrap-content">
      <div className="profile-header" style={{ backgroundImage: `url(${BackgroundRepeat})` }}>
        <div className="profile-header-avatar">
          <img src={userInfor?.avatar} alt="" />
        </div>
        <div className="profile-header-username">{userInfor?.username}</div>
      </div>
      <div className="profile-body py-5 container">
        <nav>
          <Link
            className={classNames({
              active: pathname === 'timeline'
            })}
            to={`/profile/${userInfor?._id}/timeline`}
          >
            Dòng thời gian
          </Link>
          <Link
            className={classNames({
              active: pathname === 'about'
            })}
            to={`/profile/${userInfor?._id}/about`}
          >
            Thông tin
          </Link>
        </nav>
        <Route exact path={`/profile/${userInfor?._id}/timeline`}>
          <div className="profile-body-timeline">
            {!postsOfUser && <div className="profile-timeline-content">Người dùng chưa có bài viết nào</div>}
            {postsOfUser && postsOfUser.map((post, index) => <Post post={post} index={index} />)}
          </div>
        </Route>
        <Route exact path={`/profile/${userInfor?._id}/about`}>
          <div className="profile-body-about">
            <table className="table">
              <thead>
                <tr className="thead-dark">
                  <th>Chủ đề</th>
                  <th>Nội dung</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tên người dùng</td>
                  <td>
                    <Input name="username" onChange={handleChange} required value={userForm?.username} />
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>
                    <Input name="email" onChange={handleChange} required value={userForm?.email} />
                  </td>
                </tr>
                <tr>
                  <td>Số điện thoai</td>
                  <td>
                    <Input name="phone" onChange={handleChange} required value={userForm?.phone} />
                  </td>
                </tr>
                <tr>
                  <td>Địa chỉ</td>
                  <td>
                    <Input name="address" onChange={handleChange} required value={userForm?.address} />
                  </td>
                </tr>
                <tr>
                  <td>Số bài viết</td>
                  <td>
                    {postsOfUser !== null && postsOfUser.length}
                    {!postsOfUser && 'Loading...'}
                  </td>
                </tr>
                <tr>
                  <td>Số giao dịch</td>
                  <td>
                    {postsOfUser !== null && postsOfUser.length}
                    {!postsOfUser && 'Loading...'}
                  </td>
                </tr>
              </tbody>
            </table>

            <Button type="primary" onClick={handleUpdateUser}>
              Cập nhật người dùng
            </Button>
          </div>
        </Route>
      </div>
    </div>
  )
}
