'use client'
import { Card, CardBody, Container, Table } from "reactstrap";
import InvoiceFiveHeader from "./InvoiceFiveHeader";
import InvoiceNumber from "./InvoiceNumber";
import InvoiceTable from "./InvoiceTable";
import InvoiceFiveSign from "./InvoiceFiveSign";
import { InvoiceButtons } from "../Common/InvoiceButtons";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Invoice, InvoiceFive } from "@/Constant";
import Breadcrumbs from "@/CommonComponent/Breadcrumbs/Breadcrumbs";

const InvoiceFiveContainer = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef,
  });
  return (
    <>
      <Breadcrumbs mainTitle={InvoiceFive} parent={Invoice} />
      <div ref={contentRef}>
        <Container className="invoice-2">
          <Card>
            <CardBody>
              <Table responsive borderless className="table-wrapper theme-scrollbar">
                <tbody>
                  <tr>
                    <td>
                      <InvoiceFiveHeader />
                    </td>
                  </tr>
                  <tr>
                    <InvoiceNumber />
                  </tr>
                  <tr>
                    <InvoiceTable />
                  </tr>
                </tbody>
                <tbody style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <InvoiceFiveSign />
                  <InvoiceButtons handlePrint={handlePrint} />
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default InvoiceFiveContainer;
