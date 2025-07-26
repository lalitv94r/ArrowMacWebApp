import { useAppSelector } from "@/Redux/Hooks";
import { Card } from "reactstrap";
import InterviewMailHeader from "./InterviewMailHeader";
import InterviewMailBody from "./InterviewMailBody";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const InterviewMail = () => {
  const {interviewEmail} = useAppSelector((state)=>state.letterBox)
 const contentRef = useRef<HTMLDivElement | null>(null);

 const handlePrintData = useReactToPrint({
   contentRef,
 });
  
  return (
    <Card className={`email-body email-read ${interviewEmail ? "show" : "hide"}`}>
      <InterviewMailHeader />
      <InterviewMailBody ref={contentRef} handlePrint={handlePrintData} />
    </Card>
  );
};

export default InterviewMail;
