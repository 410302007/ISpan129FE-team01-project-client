import { useState, useEffect } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faCartShopping,
  faAnglesLeft,
} from '@fortawesome/free-solid-svg-icons'
import Ball from '../img/layout/毬.svg' //圖片
import Menu from './Menu'
import AbilityTrain from './AbilityTrain'
import { QuantitySelector, SquareAccounts } from '../template'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function MainLayouts() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  // const
  const navigate = useNavigate()
  // 取得購物車的資料並轉成Json
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  )

  // 在點擊“移除”按鈕時，從購物車中刪除該商品
  const removeItem = (index) => {
    // 切割購物車的Json資料
    const newItems = [...items.slice(0, index), ...items.slice(index + 1)]
    localStorage.setItem('cart', JSON.stringify(newItems))
    // 更新狀態以重新渲染畫面
    setItems(newItems)
  }
  const updateQuantity = (index, newQuantity) => {
    const newItems = [...items]
    newItems[index].product_quantity = newQuantity
    localStorage.setItem('cart', JSON.stringify(newItems))
    setItems(newItems)
  }
  // 購物車更新時重新渲染
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cart')) || []
    setItems(storedItems)
  }, [localStorage.getItem('cart')])
  return (
    <div className="wrap">
      <nav className="nav">
        <Link to="/">
          <img src={Ball} alt="" />
        </Link>
        <Menu />
        <AbilityTrain />
        <Button variant="primary" onClick={handleShow}>
          <FontAwesomeIcon icon={faCartShopping} />
        </Button>
      </nav>

      <main className="content-border">
        <div className="content">
          <Outlet />

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header>
              <Modal.Title>購物車</Modal.Title>
              <Button variant="secondary" onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
              </Button>
            </Modal.Header>
            <main className="shopping__cart">
              <div className="cart__body">
                <table>
                  <thead>
                    {/* <tr>
              <th>名稱</th>
              <th>價格</th>
              <th>數量</th>
              <th>操作</th>
            </tr> */}
                  </thead>
                  <tbody>
                    {items.map(
                      (
                        {
                          product_id,
                          product_name,
                          product_price,
                          product_image,
                          product_quantity,
                        },
                        index
                      ) => (
                        <tr key={product_id}>
                          <td>
                            <img
                              src={`http://localhost:3002/uploads/${product_image}`}
                              alt={product_name}
                            />
                          </td>
                          <td>{product_name}</td>
                          <td>{product_price}</td>
                          <td>
                            <QuantitySelector
                              productQuantity={product_quantity}
                              index={index}
                              updateQuantity={updateQuantity}
                            />
                          </td>
                          <td>
                            <button
                              className="btn"
                              onClick={() => removeItem(index)}
                            >
                              <FontAwesomeIcon icon={faXmark} />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
              {items.length > 0 ? (
                <div className="aside d-flex justify-content-center">
                  <SquareAccounts className="more_color" />
                </div>
              ) : (
                '沒有選擇商品'
              )}
            </main>
          </Modal>
        </div>
      </main>
    </div>
  )
}

export default MainLayouts
