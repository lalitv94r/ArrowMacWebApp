import { Card, CardBody, Col } from 'reactstrap'
import { ImagePath, WithControl } from '@/Constant'
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { withControlData, withControlDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import RatioImage from '@/CommonComponent/RatioImage';

const WithControls = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={WithControl} span={withControlData} headClass="pb-0" />
        <CardBody>
          <Swiper modules={[Navigation, Autoplay]} navigation spaceBetween={30} slidesPerView={1} loop={true} autoplay={{ delay: 2000 }}>
            {withControlDataList?.map((item, index) => (
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

export default WithControls