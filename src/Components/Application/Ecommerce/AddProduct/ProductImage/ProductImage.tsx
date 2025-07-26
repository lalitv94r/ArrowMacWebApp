import CommonFileUpload from "@/Components/BonusUi/Dropzone/Common/CommonFileUpload";
import { ProductImageHeading } from "@/Constant";
import { Card, CardBody, Form } from "reactstrap";
import SelectSize from "./SelectSize";

const ProductImage = () => {

  return (
    <Card>
      <CardBody>
        <div className="product-info">
          <h4>{ProductImageHeading}</h4>
          <Form>
            <CommonFileUpload/>
          </Form>
          <SelectSize />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductImage;
