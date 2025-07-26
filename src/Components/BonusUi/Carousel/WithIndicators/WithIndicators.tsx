import { Card, CardBody, Col } from 'reactstrap'
import { ImagePath, WithIndicator } from '@/Constant'
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { withIndicatorData, withIndicatorDataList } from '@/Data/BonusUi/ReactstrapCarousel/ReactstrapCarousel'
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon'
import RatioImage from '@/CommonComponent/RatioImage';

const WithIndicators = () => {
  return (
    <Col xl="6" xs="12">
      <Card>
        <CardHeaderCommon title={WithIndicator} span={withIndicatorData} headClass="pb-0" />
        <CardBody>
          <Swiper modules={[Pagination, Navigation]} navigation pagination={{ clickable: true }} spaceBetween={30} slidesPerView={1} loop={true} autoplay={{ delay: 2000 }}>
            {withIndicatorDataList?.map((item, index) => (
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

export default WithIndicators