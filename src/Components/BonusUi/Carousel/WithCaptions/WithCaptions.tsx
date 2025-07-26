import { Card, CardBody, Col } from 'reactstrap'
import { ImagePath, WithCaption } from '@/Constant'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useState } from "react";
import { withCaptionData, withCaptionDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import RatioImage from '@/CommonComponent/RatioImage';

const WithCaptions = () => {

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={WithCaption} span={withCaptionData} headClass="pb-0" />
        <CardBody className="mt-2 mb-3">
          <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} loop slidesPerView={1} onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}>
            {withCaptionDataList?.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                  <RatioImage className="d-block w-100" src={`${ImagePath}/${slide.image}`} alt="drawing-room" />
                  <div className="carousel-caption d-none d-md-block">
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

export default WithCaptions