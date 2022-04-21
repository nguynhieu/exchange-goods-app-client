import { Table, Tag } from 'antd'
import moment from 'moment'
import React, { useContext, useEffect, useState } from 'react'
import { billApi } from '../../apis'
import { UserContext } from '../../contexts/UserContext'
import './TransactionHistory.css'

export default function () {
  const [billList, setBillList] = useState([])

  useEffect(() => {
    const fetchBillList = async () => {
      try {
        const data = await billApi.getBills()
        setBillList(data)
      } catch (err) {
        throw err
      }
    }

    fetchBillList()
  }, [])

  const { currentUser } = useContext(UserContext)

  const columns = [
    {
      title: 'Người dùng',
      key: 'user',
      render: () => <span>{currentUser.username}</span>
    },
    {
      title: 'Mã tour',
      dataIndex: 'tourId',
      key: 'tourId'
    },
    {
      title: 'Số chỗ',
      dataIndex: 'slot',
      key: 'slot'
    },
    {
      title: 'Giá tiền',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => (
        <span>{cost.toLocaleString()} đ</span>
      )
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'pending' ? 'geekblue' : 'green'}>{status.toUpperCase()}</Tag>
      )
    },
    {
      title: 'Ngày đặt tour',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (createAt) => <span>{moment(createAt).format('DD/MM/YYYY')}</span>
    }
  ]

  return (
    <div className="my-5">
      <div className="container">
        <h3 className="text-center mb-4">LỊCH SỬ ĐẶT TOUR</h3>
        <Table columns={columns} dataSource={billList} />
      </div>
    </div>
  )
}
