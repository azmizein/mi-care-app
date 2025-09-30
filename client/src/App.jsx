import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { login } from "./redux/userSlice";
import { loginAdmin } from "./redux/adminSlice";
import { cartSync } from "./redux/cartSlice";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { syncDataUser } from "./redux/userAdminSlice";
import { transSync } from "./redux/orderSlice";
import { syncDataProductAdmin } from "./redux/productAdminSlice";
import Axios from "axios";
import LoginAdmin from "./component/loginAdmin";
import HomeAdminOrder from "./pages/adminPages/orderListAdmin";
import WriteBlogAdmin from "./pages/adminPages/writeBlogAdmin";
import HomeAdminUser from "./pages/adminPages/userAdmin";
import UserDetail from "./pages/adminPages/userDetail";
import ListProductAdmin from "./pages/adminPages/listProductAdmin";
import ProductDetailAdmin from "./pages/adminPages/productDetailAdmin";
import TransUserDetail from "./pages/adminPages/transUserDetail";
import HomePage from "./pages/userPages/homePage";
import DetailPage from "./pages/userPages/detailPage";
import CartPage from "./pages/userPages/cartPages";
import TransactionPage from "./pages/userPages/transaksiPage";
import HomeBlogPage from "./pages/userPages/homeBlogPage";
import ReadBlogPage from "./pages/userPages/readBlogPage";
import ProfilPage from "./pages/userPages/profilPage";
import MessagePage from "./pages/userPages/messagePage";
import AddDoctorPage from "./pages/userPages/addDoctorPage";
import HomeAdmin from "./pages/adminPages/homeAdmin";
import { loginDoctor } from "./redux/doctorSlice";
import LoginDoctor from "./component/loginDoctor";
import HomeDoctor from "./pages/doctorPages/homeDoctor";
import RegisterDoctorPage from "./pages/adminPages/registerDoctor";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenAdmin = localStorage.getItem("tokenAdmin");

  const keepLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/user/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cart = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/cart/${res.data.id}`
      );
      dispatch(cartSync(cart.data));

      dispatch(
        login({
          id: res.data.id,
          username: res.data.username,
          email: res.data.email,
          isVerified: res.data.isVerified,
          cart: cart.data.length,
          phoneNumber: res.data.phoneNumber,
          age: res.data.age,
          images: res.data.images,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginAdmin = async () => {
    try {
      const res = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/admin/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${tokenAdmin}`,
          },
        }
      );

      const trans = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/transaction/getAllTransactions`
      );
      dispatch(transSync(trans.data));

      const userData = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/user/allUser`
      );
      dispatch(syncDataUser(userData.data));

      const productAdminData = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/product/list`
      );
      dispatch(syncDataProductAdmin(productAdminData.data));

      dispatch(
        loginAdmin({
          id: res.data.id,
          username: res.data.username,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const keepLoginDoctor = async () => {
    const tokenDoctor = localStorage.getItem("tokenDoctor");

    try {
      const res = await Axios.get(
        `https://84j2gl1l-2000.asse.devtunnels.ms/doctor/keepLogin`,
        {
          headers: {
            Authorization: `Bearer ${tokenDoctor}`,
          },
        }
      );

      dispatch(
        loginDoctor({
          id: res.data.id,
          firstName: res.data.firstName,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (tokenAdmin) {
      keepLoginAdmin();
    }
    keepLogin();
    keepLoginDoctor();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        {/* Router User */}
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/transaksi" element={<TransactionPage />} />
        <Route path="/blog" element={<HomeBlogPage />} />
        <Route path="/readBlog/:id" element={<ReadBlogPage />} />
        <Route path="/profile" element={<ProfilPage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/addDoctor" element={<AddDoctorPage />} />

        {/* Router Admin */}
        <Route
          path="/writeBlog"
          element={
            tokenAdmin ? <WriteBlogAdmin /> : <Navigate to="/loginAdmin" />
          }
        />
        <Route
          path="/homeAdmin"
          element={tokenAdmin ? <HomeAdmin /> : <Navigate to="/loginAdmin" />}
        />
        <Route
          path="/adminListOrder"
          element={
            tokenAdmin ? <HomeAdminOrder /> : <Navigate to="/loginAdmin" />
          }
        />
        <Route
          path="/tableUser"
          element={
            tokenAdmin ? <HomeAdminUser /> : <Navigate to="/loginAdmin" />
          }
        />
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route
          path="/userDetail/:id"
          element={tokenAdmin ? <UserDetail /> : <Navigate to="/loginAdmin" />}
        />
        <Route
          path="/listProductAdmin"
          element={
            tokenAdmin ? <ListProductAdmin /> : <Navigate to="/loginAdmin" />
          }
        />
        <Route
          path="/productDetail/:id"
          element={
            tokenAdmin ? <ProductDetailAdmin /> : <Navigate to="/loginAdmin" />
          }
        />
        <Route
          path="/transUserDetail/:id"
          element={
            tokenAdmin ? <TransUserDetail /> : <Navigate to="/loginAdmin" />
          }
        />
        <Route
          path="/registerDoctor"
          element={
            tokenAdmin ? <RegisterDoctorPage /> : <Navigate to="/loginAdmin" />
          }
        />

        <Route path="/loginDoctor" element={<LoginDoctor />} />
        <Route path="/homeDoctor" element={<HomeDoctor />} />
      </Routes>
    </div>
  );
}

export default App;
