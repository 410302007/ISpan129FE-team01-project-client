import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router'

function ReserveConfirm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    payment: '',
    remark: '',
    name: '',
    email: '',
    phone: '',
  })

  // 假如當下輸入email的值，執行 onChange 中的 handleChange 時，重新賦予formData.email的值
  function handleChange(event) {
    const { name, value } = event.target // input tag
    // ...formData 為 改變前的 obj值，[name]: value 為需要改變的key : value，以input eamil來說 input中name取名為email 所以[name] 是 email，value則為當下輸入的值
    // setFormData({ ...formData, [name]: value })為何要這樣寫?  (舉例 ...formData 如果不寫，最後obj只剩下 email: ''，其他欄位會消失)
    setFormData({ ...formData, [name]: value })
  }
  const [reserveConfirm, setReserveConfirm] = useState({
    roomCount: 1,
    petCount: 0,
    childCount: 0,
    adultCount: 1,
    selectPet: '',
    startDate: new Date(),
    endDate: new Date().setDate(new Date().getDate() + 1),
    differenceInDay: 1, // 入住日到退房日的天數
    money: 0,
    total: 0,
  })

  useEffect(() => {
    const memberId = localStorage.getItem('id')
    console.log('memberId2-', memberId)
    if (memberId) {
      fetch(`http://localhost:3002/member/edit/${memberId}`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data', data)
          setFormData({
            //物件合併
            ...formData,
            ...{ name: data.name, email: data.email, phone: data.mobile },
          })
        })

        .catch((error) => console.error(error))
    }
    setReserveConfirm(JSON.parse(sessionStorage.getItem('reserveData')))
  }, [])
  function formatDate(date) {
    return date ? format(date, 'yyyy/MM/dd') : ''
  }
  const img = require(`../../img/hotels/${
    reserveConfirm.selectPet === 'forest' ? 'cat-room1.png' : 'cat-room2.jpg'
  }`)

  return (
    <>
      <div className="rc-container rwd-container">
        <div className="rc-content-left rwd-col-12">
          <div className="rc-text-header">確認並付款</div>
          <div className="rc-title">付款方式</div>
          <form>
            <div className="mb-3">
              <select
                className="form-select mb-3"
                value={formData.payment}
                name="payment"
                onChange={handleChange}
              >
                <option value="" disabled>
                  {/* 對應到payment: ''，如果為payment: 'onSite'則顯示現場付款*/}
                  請選擇付款方式
                </option>
                <option value="linePay">Line Pay</option>
                <option value="onSite">現場付款</option>
              </select>
            </div>

            <div className="mb-3 ">
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="備註..."
                value={formData.remark}
                onChange={handleChange}
                name="remark"
              ></textarea>
            </div>
            <hr />
            <div className="rc-title">聯絡資訊</div>
            <div className="mb-3 ">
              <input
                id="name"
                type="text"
                className="form-control"
                name="name"
                placeholder="姓名"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 ">
              <input
                id="email"
                type="email"
                className="form-control"
                name="email"
                placeholder="信箱"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 ">
              <input
                id="phone"
                type="tel"
                className="form-control"
                name="phone"
                placeholder="電話"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </form>
        </div>
        <div className="rc-content-right rwd-col-12">
          <div className="r-wrap">
            <div className="r-form">
              <div className="r-form-day">
                <div className="check-in">
                  <p>入住日期</p>
                  <p>{formatDate(new Date(reserveConfirm.startDate))}</p>
                </div>
                <div className="check-out">
                  <p>退房日期</p>
                  <p>{formatDate(new Date(reserveConfirm.endDate))}</p>
                </div>
              </div>
              <div className="r-form-adult">
                <p>房間數量</p>
                <div className="calculate-btn-box">
                  <span>{reserveConfirm.roomCount}</span>
                </div>
              </div>
              <div className="r-form-adult">
                <p>成人</p>
                <div className="calculate-btn-box">
                  <span>{reserveConfirm.adultCount}</span>
                </div>
              </div>
              <div className="r-form-child">
                <p>兒童</p>
                <div className="calculate-btn-box">
                  <span>{reserveConfirm.childCount}</span>
                </div>
              </div>
              <div className="r-form-pet">
                <p>寵物</p>
                <div className="calculate-btn-box">
                  <span>{reserveConfirm.petCount}</span>
                </div>
              </div>
              {reserveConfirm.selectPet ? (
                <>
                  <p>您選擇的寵物窩造型:</p>
                  <div className="choose-pet-section">
                    <img src={img} alt="" />
                  </div>
                </>
              ) : (
                ''
              )}
            </div>
            <div className="r-price">
              <div className="price-day">
                <p>
                  ${reserveConfirm.money} TWD *{reserveConfirm.differenceInDay}
                  晚
                </p>
                <p>${reserveConfirm.money} TWD </p>
              </div>
              <div className="room-count">
                <p>*{reserveConfirm.roomCount}間</p>
              </div>
              <hr />
              <div className="total-price">
                <p>總價</p>
                <p>${reserveConfirm.total} TWD</p>
              </div>
            </div>
            <div className="r-btn-box">
              <button
                type="button"
                className="btn btn-primary btn-lg min-width-auto ml-10px"
                onClick={() => {
                  const isLogin = localStorage.getItem('id')
                  if (isLogin) {
                    if (formData.payment === 'onSite') {
                      console.log('加入訂單api')
                    } else if (formData.payment === 'linePay') {
                      console.log('導向linePay付款')
                    }
                  } else {
                    navigate('/login')
                  }
                  console.log('formData', formData)
                  console.log('reserveConfirm', reserveConfirm)
                }}
              >
                結帳
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReserveConfirm
