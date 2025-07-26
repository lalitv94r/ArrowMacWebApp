import { Card, CardBody, Col, Input, Table } from "reactstrap";
import { Monthly, TopSellingProductsHeading, Weekly, Yearly } from "@/Constant";
import TopSellingProductsTableBody from "./TopSellingProductsTableBody";
import CardCommonHeader from "@/CommonComponent/CommonCardHeader/CardCommonHeader";

const TopSellingProducts = () => {
  return (
    <Col md="6" xl="7">
      <Card>
        <CardCommonHeader headClass="pb-0" title={TopSellingProductsHeading} firstItem={Weekly} secondItem={Monthly} thirdItem={Yearly} />
        <CardBody className="selling-table checkbox-checked">
            <Table responsive id="sell-product">
              <thead>
                <tr>
                  <th>
                    <Input type="checkbox" />
                  </th>
                  <th>Product Name</th>
                  <th>Order Id</th>
                  <th>Email</th>
                  <th>Stock</th>
                  <th>Amount </th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                <TopSellingProductsTableBody />
              </tbody>
            </Table>
        </CardBody>
      </Card>
    </Col>
  );
};

export default TopSellingProducts;