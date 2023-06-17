/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import HomeSlideView from './HomeSlideView';

const HomeSlider = () => {

  const [showRevealAnimation, setShowRevealAnimation] = useState(0);

  const slidersData = [
    {
      id: 1,
      sliderImage: "/images/slider/slider-1.jpeg",
      sliderTitle: "Buy Products by using AI System",
    },
    {
      id: 2,
      sliderImage: "/images/slider/slider-2.jpeg",
      sliderTitle: "Easy way to find te products",
    },
    {
      id: 3,
      sliderImage: "/images/slider/slider-3.jpeg",
      sliderTitle: "Brings variety of products for you",
    },
    {
      id: 4,
      sliderImage: "/images/slider/slider-4.jpeg",
      sliderTitle: "Shop any product by using Voice Services",
    },
    {
      id: 5,
      sliderImage: "/images/slider/slider-5.jpeg",
      sliderTitle: "AI service makes searcing more easy",
    },
  ];

  useEffect(() => {
    setShowRevealAnimation(1)
  }, [])

  return (
    <div className='homeslider-wrapper'>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        onSlideChange={(sliderData) => {
          console.log('slide change', sliderData?.snapIndex)
          setShowRevealAnimation(0)
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => {
          console.log('slide change-swiper', swiper)
        }}
        onSlideNextTransitionEnd={(swiper) => {
          console.log('slide change-onSlide-onSlideNextTransitionEnd', swiper)
          setShowRevealAnimation(1)
        }}
        onSlidePrevTransitionEnd={(swiper) => {
          console.log('slide change-onSlide-onSlidePrevTransitionEnd', swiper)
          setShowRevealAnimation(1)
        }}
      >
        {
          slidersData.length > 0 && slidersData.map((item) => (
            <SwiperSlide>
              <HomeSlideView
                id={1}
                showRevealAnimation={showRevealAnimation}
                sliderImage={item.sliderImage}
                sliderTitle={item.sliderTitle}
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default HomeSlider