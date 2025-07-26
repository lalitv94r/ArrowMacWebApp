import { CreatedByMeHeading, Href, Print } from "@/Constant";
import { useRef } from "react";
import { Printer } from "react-feather";
import { useReactToPrint } from "react-to-print";
import { Card, CardHeader } from "reactstrap";
import CreatedByMe from "./CreatedByMe";

const ListOfTask = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });

  return (
    <Card className="mb-0">
      <CardHeader className="d-flex">
        <h4 className="mb-0">{CreatedByMeHeading}</h4>
        <a href={Href} onClick={() => handlePrint()} className="f-w-600 font-primary">
          <Printer className="me-2" />
          {Print}
        </a>
      </CardHeader>
      <div ref={contentRef}>
        <CreatedByMe />
      </div>
    </Card>
  );
};

export default ListOfTask;
