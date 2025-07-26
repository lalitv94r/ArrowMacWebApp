import { Cancel, Print, PrintViews } from "@/Constant";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintPreview from "../PersonalTab/PrintPreview";
import { useRef } from "react";
import { PrintModalPreviewPropsType } from "@/Type/Application/Contacts/Contacts";

const PrintModalPreview = ({ printModal, setPrintModal, selectedUser }: PrintModalPreviewPropsType) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  const printModalToggle = () => {
    setPrintModal(false);
    handlePrint();
  };

  const closePrintModal = () => {
    setPrintModal(false);
  };
  return (
    <Modal fade className="modal-bookmark" isOpen={printModal} toggle={printModal}>
      <ModalHeader toggle={() => setPrintModal(false)}>{PrintViews}</ModalHeader>
      <ModalBody className="list-persons">
        <div ref={contentRef}>
          <PrintPreview selectedUser={selectedUser} />
        </div>
        <Button color="secondary" className="me-1" onClick={printModalToggle}>
          {Print}
        </Button>
        <Button color="primary" onClick={closePrintModal}>
          {Cancel}
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default PrintModalPreview;
