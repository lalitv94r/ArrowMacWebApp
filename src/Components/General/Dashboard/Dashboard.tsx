import { Container, Row, Col } from "reactstrap";
import { Dashboard, EcommerceDashboard } from "@/Constant";
import TotalSale from "./Ecommerce/TotalSale/TotalSale";
// import ManageOrder from "./Ecommerce/ManageOrder/ManageOrder";
// import SalesSummary from "./Ecommerce/SalesSummary/SalesSummary";
// import SaleProgress from "./Ecommerce/SaleProgress/SaleProgress";
// import BestSellers from "./Ecommerce/BestSellers/BestSellers";
// import AddProduct from "./Ecommerce/AddProduct/AddProduct";
// import SalesByProduct from "./Ecommerce/SalesByProduct/SalesByProduct";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";
// import ProductOffer from "../Common/ProductOffer/ProductOffer";
// import TotalRevenue from "./Project/TotalRevenue/TotalRevenue";
// import MonthlySales from "../Widgets/Charts/StockMarket/MonthlySales";
// import UsesWidgets from "../Widgets/Charts/StockMarket/UsesWidgets";
import ActivityReport from "./Project/TodoList/ActivityReport";
import Turnover from "../Widgets/Charts/LiveProducts/Turnover";
import LiveProducts from "../Widgets/Charts/LiveProducts/LiveProducts";
import ConsultationCount from "../Widgets/Charts/LiveProducts/ConsultationCount";

const ContainerEcommerce = () => {
  return (
    <>
      <Breadcrumbs mainTitle={Dashboard} parent={Dashboard} />
      <Container fluid className="ecommerce-dashboard">
        <Col xl="12">
          <Row>
            <TotalSale />
            <ActivityReport/>
            <Turnover/>
            <LiveProducts/>
            <ConsultationCount/>
            {/* <ManageOrder /> */}
            {/* <SalesSummary />
            <TotalRevenue />
            <MonthlySales />
            <UsesWidgets /> */}
            {/* <ProductOffer /> */}
            {/* <SaleProgress /> */}
            {/* <BestSellers /> */}
            {/* <AddProduct /> */}
            {/* <SalesByProduct /> */}
          </Row>
        </Col>
      </Container>
    </>
  );
};

export default ContainerEcommerce;
