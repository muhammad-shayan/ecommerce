import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Reset from "./pages/auth/Reset";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/reset" element={<Reset/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      <ToastContainer bodyClassName="toastBody"/>
    </>
  );
}

export default App;
