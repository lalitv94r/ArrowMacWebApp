import { Card, CardBody, Col } from 'reactstrap'
import { DarkVariants, ImagePath } from '@/Constant'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { darkVariantData, darkVariantDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import RatioImage from '@/CommonComponent/RatioImage';
import { useState } from 'react';

const DarkVariant = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Col xl="6" sm="12">
      <Card>
        <CardHeaderCommon title={DarkVariants} span={darkVariantData} headClass="pb-0" />
        <CardBody>
          <Swiper modules={[Navigation, Autoplay, Pagination]} navigation pagination={{ clickable: true }} loop slidesPerView={1} autoplay={{ delay: 2000 }} onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}>
            {darkVariantDataList?.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                  <RatioImage className="d-block w-100" src={`${ImagePath}/${slide.image}`} alt="drawing-room" />
                  <div className="carousel-caption d-none d-md-block carousel-opacity">
                    <h3>{slide.captionHeader}</h3>
                    <p>{slide.captionText}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </CardBody>
      </Card>
    </Col>
  );
}

export default DarkVariant