import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { CountOfConsultation } from "@/Constant";
import { consultationCount } from "@/Data/General/Widgets/WidgetsChartData";

const ConsultationCount = () => {
  return (
    <Col xl="12" lg="12" className="xl-50">
      <Card>
        <CardHeader>
          <h4>{CountOfConsultation}</h4>
        </CardHeader>
        <CardBody>
          <div className="chart-container">
            <Row>
              <Col xs="12">
                <ReactApexChart id="chart-widget7" options={consultationCount} series={consultationCount.series} type="area" height={300} />
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ConsultationCount;