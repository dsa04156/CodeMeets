import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

import styled from "styled-components";
import Logo from "../../Images/Logo.png"
import LogoSwing from "../../Images/LogoSwing.gif"
import Ssafy from "../../Images/ssafy.png"
import csszzal from "../../Images/csszzal.gif"
import JJal1 from "../../Images/JJal1.gif"

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
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"

        style={{width:"100%", height:"100%"}}
      >
        {/* <SwiperSlide><ImageStyle src={Logo} /></SwiperSlide> */}
        <SwiperSlide><ImageStyle src={LogoSwing} /></SwiperSlide>
        {/* <SwiperSlide><ImageStyle src={JJal1} /></SwiperSlide> */}
        {/* <SwiperSlide><ImageStyle src={Ssafy} /></SwiperSlide> */}
        {/* <SwiperSlide><ImageStyle src={csszzal} /></SwiperSlide> */}
        {/* <SwiperSlide><ImageStyle src={Logo} /></SwiperSlide> */}
        {/* <SwiperSlide><ImageStyle src={LogoSwing} /></SwiperSlide> */}
        {/* <SwiperSlide><ImageStyle src={Ssafy} /></SwiperSlide> */}
        {/* <SwiperSlide><ImageStyle src={LogoSwing} /></SwiperSlide> */}
        {/* <SwiperSlide><ImageStyle src={csszzal} /></SwiperSlide> */}

      </Swiper>
    </>
  );
}

export default SideSwiper;

const ImageStyle = styled.img`
display:block;
width:100%;
height:100%;
object-fit:cover;
`;