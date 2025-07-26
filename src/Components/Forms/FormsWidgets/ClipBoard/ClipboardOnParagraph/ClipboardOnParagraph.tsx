import { useState } from 'react'
import { Button, Card, CardBody, Col } from 'reactstrap';
import { ClipboardOnParagraphs, Copy, CopyFromParagraph } from '@/Constant';
import CommonCardHeader from '@/CommonComponent/CommonCardHeader/CommonCardHeader';
import { toast } from 'react-toastify';

const ClipboardOnParagraph = () => {
     const ClipBoardParaGraph: string = "On that day, hopes and dreams were crushed. Even though it should have been anticipated, it nonetheless surprised me. The warning indicators have been disregarded in favour of the slim chance that it would actually occur. From a hopeful prospect, it had evolved into an unquestionable conviction that it must be fate. That was up until it wasn't, at which point all of the aspirations and dreams collapsed.";
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
          <CommonCardHeader title={ClipboardOnParagraphs} headClass="pb-0" />
          <CardBody>
            <div className="clipboaard-container">
              <p className="f-16">{CopyFromParagraph}</p>
              <h6 className="border rounded card-body f-w-300">{ClipBoardParaGraph}</h6>
              <div className="mt-3 text-end">
                <Button className="btn-clipboard" color="info" onClick={handleCopy}>
                  <i className="fa fa-copy"></i> {Copy}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    );
}

export default ClipboardOnParagraph