import { Card, CardBody, Col } from 'reactstrap'
import { CrossFades, ImagePath } from '@/Constant'
import { crossFadeData, crossFadeDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from 'react'
import RatioImage from '@/CommonComponent/RatioImage'
const CrossFade = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={CrossFades} span={crossFadeData} headClass="pb-0" />
        <CardBody>
          <Swiper modules={[Autoplay, EffectFade, Navigation]} effect="fade" navigation loop autoplay={{ delay: 2000 }} slidesPerView={1} onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}>
            {crossFadeDataList?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={`carousel-item ${index === activeIndex ? "active" : ""}`}>
                  <RatioImage className="d-block w-100" src={`${ImagePath}/${item.image}`} alt="drawing-room" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </CardBody>
      </Card>
    </Col>
  );
}

export default CrossFade