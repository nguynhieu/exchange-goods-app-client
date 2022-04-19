import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Button } from 'antd'

import { UserContext } from '../../contexts/UserContext'
import { EffectContext } from '../../contexts/EffectApp'
import { ExchangeContext } from '../../contexts/ExchangeContext'

import { WishList, Logout, User, Exchange, Request, History, Manager } from '../../assets/images'

import Notification from '../Notification/Notification'
import { userLogout } from '../../services/socket'

import './ActionUser.css'

const SiteAction = () => {
  const { handleShowWishlist, handleShowLayerWishlist } = useContext(EffectContext)
  const { currentUser, logout } = useContext(UserContext)
  const { exchanges, isLoaded } = useContext(ExchangeContext)

  const exchangesListOfUser = exchanges.filter((item) => {
    if (currentUser) {
      return item.viewer === currentUser.username && item.status === 'WAITING'
    } else return false
  })
  const unreadExchanges = exchangesListOfUser.filter((item) => !item.isRead)

  const exchangeSent = exchanges.filter((item) => {
    if (currentUser) {
      return item.sender === currentUser.username
    } else return false
  })

  const userMenu = (
    <Menu>
      {currentUser && currentUser.isAdmin === true && (
        <Menu.Item>
          <Link to="/manager-transactions">
            <Manager />
            <span>Quản lý</span>
          </Link>
        </Menu.Item>
      )}
      <Menu.Item>
        <Link to={currentUser && `/profile/${currentUser._id}`}>
          <User />
          <span>Hồ sơ của tôi</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/transactions-history">
          <History />
          <span>Lịch sử đặt tour</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/"
          onClick={() => {
            userLogout()
            logout()
          }}
        >
          <Logout />
          <span>Đăng xuất</span>
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <div className="action-user">
      {!currentUser && (
        <div className="site-action-user d-none d-md-flex">
          <li className="signin">
            <Link to="/login">
              Đăng nhập{' '}
              <span>
                <i className="far fa-user" />
              </span>
            </Link>
          </li>
          <li className="signup">
            <Link to="/signup">
              Đăng kí{' '}
              <span>
                <i className="fas fa-map-marker-alt" />
              </span>
            </Link>
          </li>
        </div>
      )}
      {currentUser && (
        <div className="site-action-user d-none d-md-flex">
          <Notification />
          <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
            <Button>
              <img src={currentUser.avatar} alt="" />
            </Button>
          </Dropdown>
        </div>
      )}
    </div>
  )
}

export default SiteAction
