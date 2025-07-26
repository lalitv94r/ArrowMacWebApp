import { useRef } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Cancel, Print, PrintViews } from "@/Constant";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import PrintPreview from "./PrintPreview";
import { PrintModalPropsTypes } from "@/Type/Application/Contacts/Contacts";

const PrintModalPreview:React.FC<PrintModalPropsTypes> = ({ printModal, selectedUser, toggleCallback }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  const printModalToggle = () => {
    toggleCallback(false);
    handlePrint();
  };

  const closePrintModal = () => {
    toggleCallback(false);
  };
  
  return (
    <Modal fade className="modal-bookmark" isOpen={printModal} toggle={printModalToggle}>
      <ModalHeader toggle={printModalToggle}>{PrintViews}</ModalHeader>
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
