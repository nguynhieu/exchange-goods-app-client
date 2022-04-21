import { Carousel } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import bannerApi from '../../apis/bannerApi'
import { Notfind } from '../../components'
import './Event.css'

export default function () {
  const [banners, setBanners] = useState([])

  const history = useHistory()

  useEffect(() => {
    const fetchBannerList = async () => {
      const data = await bannerApi.getBanners()
      setBanners(data)
      try {
      } catch (err) {
        throw err
      }
    }

    fetchBannerList()
  }, [])

  return (
    <div className="event">
      {banners.length < 1 && (
        <>
          <h4
            className="text-center mt-4 text-uppercase"
            style={{ fontSize: '1rem', fontWeight: 'bold' }}
          >
            Hiện chưa có sự kiện nào
          </h4>
          <Notfind />
        </>
      )}

      {banners.length >= 1 && (
        <>
          <h4 className="text-center mb-3">CÁC SỰ KIỆN ĐANG DIỄN RA</h4>
          <Carousel autoplay>
            {banners.length >= 1 &&
              banners.map((banner) => (
                <div
                  key={banner.id}
                  onClick={() => {
                    history.push(`/event/${banner.id}`)
                  }}
                >
                  <img src={banner.image} className="banner__image w-100" />
                </div>
              ))}
          </Carousel>
        </>
      )}
    </div>
  )
}
