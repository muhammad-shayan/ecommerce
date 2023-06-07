import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { sliderData } from './sliderData'
import './Slider.scss'
import { useEffect, useState } from 'react'

const Slider = () => {
    const [currentSlide,setCurrentSlide] = useState(0)
    const slideLength = sliderData.length
    let slideInterval;

    const prevSlide = () => {
      setCurrentSlide((currentSlide===0)?slideLength-1:currentSlide-1)
    }

    const nextSlide = () => {
      setCurrentSlide((currentSlide===slideLength-1)?0:currentSlide+1)
    }

    useEffect(()=>{
      slideInterval = setInterval(nextSlide,5000)
      return ()=>clearInterval(slideInterval)
    },[currentSlide])
    
  
    return (
    <div className="slider">
        <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide}/>
        <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
        {sliderData.map((slide,index)=>{
          const {image,heading,desc} = slide
          return (
            <div key={index} className={index===currentSlide?'slide current':'slide'}>
                {index===currentSlide && 
                <>
                  <img src={image} alt="" />
                  <div className="content">
                    <h2>{heading}</h2>
                    <p>{desc}</p>
                    <hr/>
                    <a href="#products" className='--btn --btn-primary'>Shop Now</a>
                  </div>
                </>}
            </div>
          )

        })}
        
    </div>
  )
}

export default Slider