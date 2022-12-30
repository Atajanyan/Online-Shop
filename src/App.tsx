import React, {useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './features/layout/layout'
import ScrollToTop from './features/scrollToTop/scrollToTop'    
import HomePage from './pages/home/homePage'
import DepartmentPage from './pages/department/departmentPage'
import ProductsPage from './pages/products/productsPage'
import Location from './pages/location/location'
import AboutUs from './pages/aboutUs/aboutUs'
import CustomerAccountSidebar from './pages/customer/customerAccountSidebar'
import AdminPage from './pages/admin/pagesForAdmin/productPage/addProduct/addProductBtn'
import FavoritesPage from './pages/favorites/favoritesPage'
import ShoppingCartPage from './pages/cart/shoppingCartPage'
import NotFound from './pages/notFound/NotFound';
import ProductPage from './pages/productPage/productPage';
import Products from './pages/admin/pagesForAdmin/productPage/products';
import Users from './pages/admin/pagesForAdmin/usersPage/users';
import Orders from './pages/admin/pagesForAdmin/ordersPage/orders';
import SearchResults from './features/search/searchResults';
import SignUp from './pages/user/signUp';
import SignIn from './pages/user/signIn';
import { ToastContainer } from 'react-toastify';
import SignedOut from './pages/user/signedOut';
import VerifyEmail from './pages/user/verifyEmail';
import { useAppDispatch } from './app/hooks';
import { getCurrentUser } from './features/slices/currentUserSlice';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from './firebase/auth';

import 'react-toastify/dist/ReactToastify.css'
import CustomerOrders from './pages/customer/customerOrders';
import CustomerSettings from './pages/customer/customerSettings';
import CustomerAccount from './pages/customer/customerAccount';
import CustomerAddresses from './pages/customer/customerAddresses';
import OrderDetails from './pages/customer/orderDetails';
import Checkout from './pages/cart/checkout';
import SuccessPage from './pages/cart/successPage';
import AdminHome from './pages/admin/adminHome';
import SideBar from './pages/admin/adminSidebar/sideBar';

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
  if(user) {
  dispatch(getCurrentUser())
}
    })
    
  }, [])

  return (
      <BrowserRouter>
      <ToastContainer />
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/:departmentId' element={<DepartmentPage />} />
        <Route path='/:departmentId/:categoryId' element={<ProductsPage />} />
        <Route path='/products/:productId' element={<ProductPage/>}/>
        <Route path= '/location' element={<Location/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/account' element={<CustomerAccountSidebar />}>
           <Route index element={<CustomerAccount/>}/>
           <Route path='/account/orders' element={<CustomerOrders/>}/>
           <Route path='/account/orders/purchase/:number' element={<OrderDetails/>}/>
           <Route path='/account/addresses' element={<CustomerAddresses/>}/>
           <Route path='/account/settings' element={<CustomerSettings/>}/>
        </Route>
        <Route path='/checkout' element={<Checkout />}/>
        <Route path='/checkout/success' element={<SuccessPage />}/>
        <Route path='/account/signIn' element={<SignIn />}/>
        <Route path='/account/signUp' element={<SignUp />}/>
        <Route path='/account/signOut' element={<SignedOut />}/>
        <Route path='/account/verifyEmail' element={<VerifyEmail />}/>
        <Route path='/account/admin'element={<SideBar />}>
          <Route index element={<AdminHome/>}/>
          <Route path='/account/admin/products'element={<Products />} />
        <Route path='/account/admin/users'element={<Users />} />
        <Route path='/account/admin/orders'element={<Orders/>} />       
        </Route>
        <Route path='/favorites' element={<FavoritesPage />}/>
        <Route path='/shoppingcart' element={<ShoppingCartPage />}/>
        <Route path='/search/:keyword' element={<SearchResults/>}></Route>
        <Route path='*' element={<NotFound/>}> </Route>
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
