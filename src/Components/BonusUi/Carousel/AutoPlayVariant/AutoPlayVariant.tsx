import { Card, CardBody, Col } from 'reactstrap'
import { AutoPlayVariants, ImagePath } from '@/Constant'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { autoPlayData, autoPlayDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import RatioImage from '@/CommonComponent/RatioImage';

const AutoPlayVariant = () => {
  return (
    <Col xl="6" xs="12">
      <Card className="auto-slider">
        <CardHeaderCommon title={AutoPlayVariants} span={autoPlayData} headClass="pb-0" />
        <CardBody>
          <Swiper spaceBetween={30} centeredSlides={true} autoplay={{ delay: 2500, disableOnInteraction: false }} pagination={{ clickable: true }} navigation={true} modules={[Autoplay, Pagination, Navigation]} className="mySwiper swiper-h">
            {autoPlayDataList.map((item, index) => (
              <SwiperSlide key={index}>
                <RatioImage src={`${ImagePath}/${item.image}`} className="d-block w-100" alt="Vertical_Slider" />
              </SwiperSlide>
            ))}
          </Swiper>
        </CardBody>
      </Card>
    </Col>
  );
}

export default AutoPlayVariant