import React from 'react'
import { AiFillPhone } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { IoLocationSharp } from 'react-icons/io5'
import { FaInstagramSquare } from 'react-icons/fa'
import { MdOutlineFacebook } from 'react-icons/md'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBrandsLine } from '@fortawesome/free-solid-svg-icons'

function Footer() {
  return (
    <>
      <div class="footer">
        <div class="footer-row">
          <div class="footer-item1">
            <a className="footer-word" href="/">
              關於我們
            </a>
            <a className="footer-word" href="/">
              熱門推薦
            </a>
            <a className="footer-word" href="/">
              成為會員
            </a>
            <a className="footer-word" href="/">
              聯絡我們
            </a>
          </div>
          <div class="footer-item2">
            <div className="footer-imformation">
              <AiFillPhone /> 886-7-1112223
            </div>
            <div className="footer-imformation">
              <MdEmail />
              pet@gmail.com
            </div>
            <div className="footer-imformation">
              <IoLocationSharp />
              高雄市前金區中正四路211號
            </div>

            {/* <ul class="icon">
                <li>
                  <FaInstagramSquare />
                </li>
                <li><FontAwesomeIcon icon={faBrandsLine} /></li>
                <li>
                  <a href="/">
                    <MdOutlineFacebook />
                  </a>
                </li>
              </ul> */}
          </div>
          <div class="footer-item3">
            <button className="footer-btn">活動預約 ▸</button>
            <button className="footer-btn">餐點預約 ▸</button>
            <button className="footer-btn">住宿訂房 ▸</button>
          </div>
        </div>

        <div class="conpyright">
          僅資展專題使用Demo用，請勿商業使用或未經同意變更
        </div>
      </div>
    </>
  )
}

export default Footer
