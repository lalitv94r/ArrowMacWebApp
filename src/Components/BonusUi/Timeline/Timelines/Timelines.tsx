import { Card, CardBody, Col } from "reactstrap";
import { TimelineTitle } from "@/Constant";
import { timeLineData } from "@/Data/BonusUi/Timeline/Timeline";
import AppIdeasTimeline from "./AppIdeasTimeline";
import BlogTimeline from "./BlogTimeline";
import CarouselTimeline from "./CarouselTimeline";
import AutoTestingTimeline from "./AutoTestingTimeline";
import MeetUpTimeline from "./MeetUpTimeline";
import ResolutionTimeline from "./ResolutionTimeline";
import CardHeaderCommon from "@/CommonComponent/CommonCardHeader/CardHeaderCommon";

const Timelines = () => {
  return (
    <Col sm="12" className="box-col-12">
      <Card>
        <CardHeaderCommon title={TimelineTitle} span={timeLineData} headClass="pb-0" />
        <CardBody className="default-timeline">
          <section className="cd-container" id="cd-timeline">
            <AppIdeasTimeline />
            <BlogTimeline />
            <CarouselTimeline />
            <AutoTestingTimeline />
            <MeetUpTimeline />
            <ResolutionTimeline />
          </section>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Timelines;
