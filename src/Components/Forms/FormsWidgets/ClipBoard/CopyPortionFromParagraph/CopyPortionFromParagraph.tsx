import { useState } from "react";
import { Button, Card, CardBody, Col } from "reactstrap";
import { ClipBoardCopy, CopyHighLightedText, CopyPortionFromParagraphs, HighlightText } from "@/Constant";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader/CommonCardHeader";
import { toast } from "react-toastify";

const CopyPortionFromParagraph = () => {
  const ClipBoardParaGraph: string = "Web design is the process of creating websites";
  const [clipBoardValues, setClipBoardValues] = useState({ value: ClipBoardParaGraph, copied: false });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(clipBoardValues.value);
      setClipBoardValues({ ...clipBoardValues, copied: true });

      setTimeout(() => {
        setClipBoardValues({ ...clipBoardValues, copied: false });
      }, 2000);
    } catch (err) {
      toast.error("Failed to copy text: " + err);
    }
  };

  return (
    <Col sm="12" md="6">
      <Card>
        <CommonCardHeader title={CopyPortionFromParagraphs} headClass="pb-0" />
        <CardBody>
          <div className="clipboaard-container">
            <p className="f-16">{ClipBoardCopy}</p>
            <h6 className="solid-border rounded card-body f-w-300">
              <span className="bg-primary text-white p-1">{HighlightText}</span>
              that are visible online. Take a website design course to learn how to create an appealing and responsive website. In the discipline of web design, there are degree, diploma, postgraduate degree, and certificate programmes. A web designer is responsible for a website's look, feel, and occasionally even content.
            </h6>
            <div className="mt-3 text-end">
              <Button className="btn-clipboard" color="secondary" onClick={handleCopy}>
                <i className="fa fa-copy"></i> {CopyHighLightedText}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default CopyPortionFromParagraph;
