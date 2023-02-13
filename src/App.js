import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MainLayouts from './layouts/MainLayouts'
import Activity from './pages/activity/Activity'
import Course from './pages/course/Course'
import HomePage from './pages/HomePage'
import Hotel from './pages/hotel/Hotel'
import Reserve from './pages/hotel/Reserve'
import LatestNews from './pages/latestNews/LatestNews'
import Meals from './pages/meals/Meals'
import NotFound from './pages/NotFound'
import Product from './pages/product/Product'
import RegisterMember from './pages/member/RegisterMember'
import Cart from './pages/cart/Cart'
import ButtonTemplate from './template/button'
import FormTemplate from './template/form'
//引入頁面元件

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route index element={<HomePage />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="meals" element={<Meals />}></Route>
          <Route path="hotel" element={<Hotel />}></Route>
          <Route path="reserve" element={<Reserve />}></Route>
          <Route path="latestNews" element={<LatestNews />}></Route>
          <Route path="course" element={<Course />}></Route>
          <Route path="activity" element={<Activity />}></Route>
          <Route path="*" element={<NotFound />} />
          <Route path="member" element={<RegisterMember />} />
          <Route path="cart" element={<Cart />} />
          <Route path="button" element={<ButtonTemplate />}></Route>
          <Route path="form" element={<FormTemplate />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
