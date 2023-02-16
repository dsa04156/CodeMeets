import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

import styled from 'styled-components';

import LogoSwing from '../../Images/LogoSwing.gif';

const SideSwiper = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ width: '100%', height: '100%' }}
      >
        <SwiperSlide>
          <ImageStyle src={LogoSwing} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default SideSwiper;

const ImageStyle = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
