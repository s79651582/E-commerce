import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import HomePages from './pages/Home/HomePages';
import NavBarLogin from './components/Uitily/NavbarLogin';
import Footer from './components/Uitily/Footer';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import AllCategoryPage from './pages/Category/AllCategoryPage';
import AllBrandPage from './pages/Brand/AllBrandPage';
import ShopProductsPage from './pages/Products/ShopProductsPage';
import ProductDetalisPage from './pages/Products/ProductDetalisPage';
import CartPage from './pages/Cart/CartPage';
import ChoosePayMethoudPage from './pages/Checkout/ChoosePayMethoudPage';

import AdminAllProductsPage from './pages/Admin/AdminAllProductsPage';
import AdminAllOrdersPage from './pages/Admin/AdminAllOrdersPage';
import AdminOrderDetailsPage from './pages/Admin/AdminOrderDetailsPage';
import AdminAddBrandPage from './pages/Admin/AdminAddBrandPage';
import AdminAddCategoryPage from './pages/Admin/AdminAddCategoryPage';
import AdminAddSubCategoryPage from './pages/Admin/AdminAddSubCategoryPage';
import AdminAddProductsPage from './pages/Admin/AdminAddProductsPage';

import UserHomePage from './pages/User/UserHomePage';
import UserAllOrdersPage from './pages/User/UserAllOrdersPage';
import UserFavoriteProductsPage from './pages/User/UserFavoriteProductsPage';
import UserAllAddresPage from './pages/User/UserAllAddresPage';
import UserAddAddressPage from './pages/User/UserAddAddressPage';
import UserEditAddressPage from './pages/User/UserEditAddressPage';
import UserProfilePage from './pages/User/UserProfilePage';


function App() {
  return (
    <div className='font'>
      <NavBarLogin />

      <BrowserRouter>
        <Routes>
          <Route index element={<HomePages />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/allcategory" element={<AllCategoryPage />} />
          <Route path="/allbrand" element={<AllBrandPage />} />
          <Route path="/allproducts" element={<ShopProductsPage />} />
          <Route path="/allproducts/:id" element={<ProductDetalisPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order/paymethoud" element={<ChoosePayMethoudPage />} />

          <Route path="/admin/allproducts" element={<AdminAllProductsPage />} />
          <Route path="/admin/allorders" element={<AdminAllOrdersPage />} />
          <Route path="/admin/allorders/:id" element={<AdminOrderDetailsPage />} />
          <Route path="/admin/addbrand" element={<AdminAddBrandPage />} />
          <Route path="/admin/addcategory" element={<AdminAddCategoryPage />} />
          <Route path="/admin/addsubcategory" element={<AdminAddSubCategoryPage />} />
          <Route path="/admin/addproduct" element={<AdminAddProductsPage />} />

          <Route path="/user/home"  element={<UserHomePage />} />  
          <Route path="/user/allorders" element={<UserAllOrdersPage />} />
          <Route path="/user/favoriteproducts" element={<UserFavoriteProductsPage />} />
          <Route path="/user/addresses" element={<UserAllAddresPage />} />
          <Route path="/user/add-address" element={<UserAddAddressPage />} />
          <Route path="/user/edit-address" element={<UserEditAddressPage />} />
          <Route path="/user/profile" element={<UserProfilePage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;