import { Button, InputNumber, Modal } from 'antd'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
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

  const history = useHistory()

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
        fetchTour()
        setSlot(1)
        setConfirmLoading(false)
        setIsModalVisible(false)
        Swal.fire('Đặt tour thành công!', 'Bấm vào nút để hoàn tất', 'success').then(() => {
          history.push('/tours')
        })
        // history.push('/tours')
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

  const fetchTour = async () => {
    const { data } = await tourApi.getDetail(tourId)

    setTour(data.data)
  }

  useEffect(() => {
    fetchTour()
  }, [])

  return (
    <div className="tour-detail">
      <div className="container">
        {tour && tour._id && (
          <>
            <h4>{tour.title}</h4>
            <div className="row">
              <div className="col-7">
                <img src={tour.images[0]} className="w-100" />
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
              <div className="col-5">
                <div className="tour-info">
                  <p className="tour-info__title">{tour.title}</p>
                  <p>
                    <span className="font-bold tour-detail__key">Mã tour</span>
                    <span className="ml-2">{tour._id}</span>
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
                    <span className="ml-2">{tour.availableSlot}</span>
                  </p>
                </div>
                <div className="tour-booking mt-3">
                  <p>
                    <span className="font-bold tour-detail__key">Giá từ</span>
                    <span className="ml-2 tour-booking__price">
                      {tour.price.toLocaleString()} đ
                    </span>
                  </p>
                  {tour.availableSlot === 0 && (
                    <p className="text-center text-danger">Rất tiếc tour này đã hết chỗ</p>
                  )}
                  <Button
                    type="primary"
                    onClick={showModal}
                    className="w-100 main-btn"
                    disabled={tour.availableSlot === 0}
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
                <span className="ml-2">{tour._id}</span>
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
                  <InputNumber min={1} max={tour.availableSlot} value={slot} onChange={onChange} />
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
