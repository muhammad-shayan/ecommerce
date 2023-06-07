import { useEffect } from "react";
import Products from "../../components/products/Products";
import Slider from "../../components/slider/Slider";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
    
    if(location.hash.includes('#products')){
      window.scrollTo({
        top:1000,
        behavior:'smooth'
      })
      navigate('/')
    }
  },[location,navigate])
  return (
    <>
      <Slider />
      <Products />
    </>
  )
}
