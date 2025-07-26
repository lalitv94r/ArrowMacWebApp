import CommonFileUpload from "@/Components/BonusUi/Dropzone/Common/CommonFileUpload";
import { Form } from "reactstrap";

const DropzoneFile = () => {
  return (
    <Form className="m-b-20">
      <CommonFileUpload />
    </Form>
  );
};

export default DropzoneFile;
