import { Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import { Consultation, TurnOver } from "@/Constant";
import { turnOverChart } from "@/Data/General/Widgets/WidgetsChartData";

const Turnover = () => {
  return (
    <Col xl="6" lg="12" className="xl-50">
      <Card>
        <CardHeader>
          <h4>{Consultation}</h4>
        </CardHeader>
        <CardBody>
          <div className="chart-container">
            <Row>
              <Col xs="12">
                <ReactApexChart id="chart-widget7" options={turnOverChart} series={turnOverChart.series} type="area" height={300} />
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Turnover;
