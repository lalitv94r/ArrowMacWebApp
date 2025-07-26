import { Card, CardBody, Col } from 'reactstrap'
import { DisableTouchSwipings, ImagePath } from '@/Constant'
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { disableTouchData, disableTouchDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import RatioImage from '@/CommonComponent/RatioImage';

const DisableTouchSwiping = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={DisableTouchSwipings} span={disableTouchData} headClass="pb-0" />
        <CardBody>
          <Swiper modules={[Navigation]} navigation loop slidesPerView={1} simulateTouch={false}>
            {disableTouchDataList?.map((item, index) => (
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

export default DisableTouchSwiping