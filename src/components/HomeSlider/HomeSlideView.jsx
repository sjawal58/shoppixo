import React, { useEffect } from 'react'
import "./HomeSlider.css"
import { Fade } from 'react-reveal';

const HomeSlideView = (props) => {
    const { id, showRevealAnimation, sliderImage, sliderTitle } = props;
    console.log('slide change-showRevealAnimation', showRevealAnimation)

    return (
        <div className='home-slide-view-wrapper'>
            <div className="slider-info-wrap">
                {/* <Fade left cascade  when={showRevealAnimation}> */}
                    <h1 className='slider-title'>{sliderTitle}</h1>
                {/* </Fade> */}
            </div>
            <div className="slider-image-wrap">
                {/* <Fade right cascade  when={showRevealAnimation}> */}
                    <img className="slider-image" src={sliderImage} alt={sliderImage} />
                {/* </Fade> */}
            </div>
        </div>
    )
}

export default HomeSlideView