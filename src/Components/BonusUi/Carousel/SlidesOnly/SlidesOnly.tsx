import { Card, CardBody, Col } from 'reactstrap'
import { DefaultSwiperSlider, ImagePath } from '@/Constant'
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliesOnlyData, sliesOnlyDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import RatioImage from '@/CommonComponent/RatioImage';

const SlidesOnly = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={DefaultSwiperSlider} span={sliesOnlyData} headClass="pb-0" />
        <CardBody>
          <Swiper modules={[Autoplay]} spaceBetween={10} slidesPerView={1} loop={true} autoplay={{ delay: 2000 }}>
            {sliesOnlyDataList?.map((item, index) => (
              <SwiperSlide key={index}>
                <RatioImage className="d-block w-100" src={`${ImagePath}/${item.image}`} alt="drawing-room" />
              </SwiperSlide>
            ))}
          </Swiper>
        </CardBody>
      </Card>
    </Col>
  );
}

export default SlidesOnly