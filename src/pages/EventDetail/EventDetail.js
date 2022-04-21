import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { bannerApi } from '../../apis'

import './EventDetail.css'

export default function () {
  const [banner, setBanner] = useState({})

  const { eventId } = useParams()
  console.log(eventId)

  useEffect(() => {
    const fetchBanner = async () => {
      const data = await bannerApi.getDetail(eventId)
      console.log(data)
      setBanner(data)
      try {
      } catch (err) {
        throw err
      }
    }

    fetchBanner()
  }, [])

  return (
    <div className="event-detail">
      <div className="container">
        {banner && (
          <div>
            <h4 className="mb-3">{banner.title}</h4>
            <img className="w-100" src={banner.image} />
            <h5 className="my-4">Thông tin về sự kiện</h5>
            <p>{banner.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
