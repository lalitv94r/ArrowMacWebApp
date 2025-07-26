import { Card, CardBody, Col } from "reactstrap";
import { Carousel } from "react-responsive-carousel";
import { ImagePath } from "@/Constant";

const ImageSlider = () => {
  return (
    <Col xxl="4" md="6" className="box-col-6">
      <Card>
        <CardBody className="pb-0">
          <Carousel className="owl-carousel owl-theme" showStatus={false} showIndicators={false} showArrows={true} swipeable={true} autoPlay={true} thumbWidth={100} infiniteLoop>
            <div className="item">
              <img src={"https://placehold.co/917x1000/png"} />
            </div>
            <div className="item">
              <img src={"https://placehold.co/917x1000/png"} />
            </div>
            <div className="item">
              <img src={"https://placehold.co/917x1000/png"} />
            </div>
            <div className="item">
              <img src={"https://placehold.co/917x1000/png"} />
            </div>
            <div className="item">
              <img src={"https://placehold.co/917x1000/png"} />
            </div>
            <div className="item">
              <img src={"https://placehold.co/917x1000/png"} />
            </div>
            <div className="item">
              <img src={"https://placehold.co/917x1000/png"} />
            </div>
            <div className="item">
              <img src={"https://placehold.co/917x1000/png"} />
            </div>
          </Carousel>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ImageSlider;
