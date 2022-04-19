import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import classNames from 'classnames'

import { Search, Closer } from '../../assets/images'

import { EffectContext } from '../../contexts/EffectApp'
import { PostContext } from '../../contexts/PostContext'

import './Search.css'

export default function () {
  const { allPost, filterPost } = useContext(PostContext)
  const { handleShowInputXS, isShowInputxs } = useContext(EffectContext)
  const [inputValue, setInputValue] = useState('')

  const history = useHistory()

  const onSubmit = (e) => {
    e.preventDefault()

    const post = allPost.filter((post) => {
      const inputRemoved = inputValue
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()

      const addressRemoved = post.address
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .toLowerCase()

      return addressRemoved.indexOf(inputRemoved) !== -1
    })
    filterPost(post)

    history.push('/')
  }

  return (
    <div className="site-action-search">
      <form onSubmit={onSubmit}>
        <div
          className={classNames({
            'input-xs-wrapper': true,
            show: isShowInputxs
          })}
        >
          <input
            placeholder="Tìm bài viết theo địa điểm"
            className="input-xs"
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue.length === 0 && <Closer onClick={() => handleShowInputXS()} />}
          {inputValue.length > 0 && <Search onClick={() => handleShowInputXS()} />}
        </div>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input-bigger"
          placeholder="Tìm bài viết theo địa điểm"
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
  )
}
