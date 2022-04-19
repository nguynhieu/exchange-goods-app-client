import { Card } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import tourApi from '../../apis/tourApi'
import './Tours.css'

export default function () {
  const [tourList, setTourList] = useState([])

  const history = useHistory()

  useEffect(() => {
    const fetchTourList = async () => {
      const data = await tourApi.getTours()

      setTourList(data)
    }

    fetchTourList()
  }, [])

  return (
    <div className="tours">
      <div className="container">
        <h3>DU LỊCH</h3>

        <div className="tours__wrapper">
          {tourList.map((tour) => (
            <div
              className="tour"
              key={tour.id}
              onClick={() => {
                history.push(`/tours/${tour.id}`)
              }}
            >
              <Card hoverable style={{ width: '100%' }} cover={<img src={tour.image} />}>
                <p className="tour__title">{tour.title}</p>

                <div className="tour__info">
                  <p>Lịch trình: {tour.schedule}</p>
                  <p>Khởi hành: {moment(tour.departureTime).format('DD/MM/YYYY')}</p>
                  <p>Số chỗ còn nhận: {tour.availableSlots}</p>
                  <p className="tour__price">{tour.price.toLocaleString()} đ</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
