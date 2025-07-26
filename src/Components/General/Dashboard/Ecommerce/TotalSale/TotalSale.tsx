import { Col, Row } from "reactstrap";
// import TopSellingProducts from "./TopSellingProducts/TopSellingProducts";
// import CategoryOverview from "./CategoryOverview/CategoryOverview";
import NewOrders from "@/Components/General/Common/NewOrders/NewOrders";

const TotalSale = () => {
  return (
    <Col xl="12">
      <Row>
        <NewOrders />
        {/* <TopSellingProducts /> */}
        {/* <CategoryOverview /> */}
      </Row>
    </Col>
  );
};

export default TotalSale;
