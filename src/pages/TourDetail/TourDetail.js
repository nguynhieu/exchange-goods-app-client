import { Button, InputNumber, Modal } from 'antd'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import tourApi from '../../apis/tourApi'
import { UserContext } from '../../contexts/UserContext'
import './TourDetail.css'
import Swal from 'sweetalert2'

export default function () {
  const [tour, setTour] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [slot, setSlot] = useState(1)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const { tourId } = useParams()
  const { currentUser } = useContext(UserContext)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    const booking = async () => {
      try {
        const data = {
          userId: currentUser.id,
          tourId,
          slot,
          cost: tour.price * slot
        }
        setConfirmLoading(true)
        await tourApi.booking(data)
        setSlot(1)
        setConfirmLoading(false)
        Swal.fire('Đặt tour thành công!', 'Bấm vào nút để hoàn tất', 'success')
        setIsModalVisible(false)
      } catch (err) {
        throw err
      }
    }

    booking()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  function onChange(value) {
    setSlot(value)
  }

  useEffect(() => {
    const fetchTour = async () => {
      const data = await tourApi.getDetail(tourId)

      setTour(data)
    }

    fetchTour()
  }, [])

  return (
    <div className="tour-detail">
      <div className="container">
        {tour && tour.id && (
          <>
            <h4>{tour.title}</h4>
            <div className="row">
              <div className="col-8">
                <img src={tour.image} className="w-100" />
                <h5 className="my-4">Điểm nhấn hành trình</h5>
                <p>
                  <span className="tour-detail__key">Lịch trình</span>
                  <span className="ml-5">{tour.schedule}</span>
                </p>
                <p>
                  <span className="tour-detail__key">Khởi hành</span>
                  <span className="ml-5">{moment(tour.departureTime).format('DD/MM/YYYY')}</span>
                </p>
                <p>
                  <span className="tour-detail__key">Vận chuyển</span>
                  <span className="ml-5"> {tour.transport}</span>
                </p>
                <p className="text-justify">{tour.description}</p>
              </div>
              <div className="col-4">
                <div className="tour-info">
                  <p className="tour-info__title">{tour.title}</p>
                  <p>
                    <span className="font-bold tour-detail__key">Mã tour</span>
                    <span className="ml-2">{tour.id}</span>
                  </p>
                  <p>
                    <span className="font-bold tour-detail__key">Thời gian</span>
                    <span className="ml-2">{tour.schedule}</span>
                  </p>
                  <p>
                    <span className="font-bold tour-detail__key">Khởi hành</span>
                    <span className="ml-2">{moment(tour.departureTime).format('DD/MM/YYYY')}</span>
                  </p>
                  <p>
                    <span className="font-bold tour-detail__key">Vận chuyển</span>
                    <span className="ml-2">{tour.transport}</span>
                  </p>
                  <p>
                    <span className="font-bold tour-detail__key">Số chỗ còn</span>
                    <span className="ml-2">{tour.availableSlots}</span>
                  </p>
                </div>
                <div className="tour-booking mt-3">
                  <p>
                    <span className="font-bold tour-detail__key">Giá từ</span>
                    <span className="ml-2 tour-booking__price">
                      {tour.price.toLocaleString()} đ
                    </span>
                  </p>
                  {tour.availableSlots === 0 && (
                    <p className="text-center text-danger">Rất tiếc tour này đã hết chỗ</p>
                  )}
                  <Button
                    type="primary"
                    onClick={showModal}
                    className="w-100 main-btn"
                    disabled={tour.availableSlots === 0}
                  >
                    ĐẶT TOUR
                  </Button>
                </div>
              </div>
            </div>
            <Modal
              title="ĐẶT TOUR"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              confirmLoading={confirmLoading}
              footer={[
                <Button onClick={handleCancel}>Trở lại</Button>,
                <Button
                  type="primary"
                  onClick={handleOk}
                  className="main-btn"
                  loading={confirmLoading}
                >
                  Đặt tour
                </Button>
              ]}
            >
              <p className="tour-info__title">{tour.title}</p>
              <p>
                <span className="font-bold tour-detail__key">Mã tour</span>
                <span className="ml-2">{tour.id}</span>
              </p>
              <p>
                <span className="font-bold tour-detail__key">Thời gian </span>
                <span className="ml-2">{tour.schedule}</span>
              </p>
              <p>
                <span className="font-bold tour-detail__key">Khởi hành </span>
                <span className="ml-2">{moment(tour.departureTime).format('DD/MM/YYYY')}</span>
              </p>
              <p>
                <span className="font-bold tour-detail__key">Vận chuyển </span>
                <span className="ml-2">{tour.transport}</span>
              </p>
              <p>
                <span className="font-bold tour-detail__key">số chỗ </span>
                <span className="ml-2">
                  <InputNumber min={1} max={tour.availableSlots} value={slot} onChange={onChange} />
                </span>
              </p>
              <p>
                <span className="font-bold tour-detail__key">Giá tiền </span>
                <span className="ml-2">{(tour.price * slot).toLocaleString()} đ</span>
              </p>
            </Modal>
          </>
        )}
      </div>
    </div>
  )
}
