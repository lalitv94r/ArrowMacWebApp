import { Field } from "formik";
import { useState } from "react";
import { Col, FormGroup, Label, Row } from "reactstrap";
import { Big, EndingDate, Medium, ProjectSize, ProjectSizePlaceholder, Small, StartingDate } from "@/Constant";
import ReactDatePicker from "react-datepicker";

const DateSection = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  return (
    <Row>
      <Col sm="4">
        <FormGroup>
          <Label check>{ProjectSize}</Label>
          <Field as="select" name="size" placeholder={ProjectSizePlaceholder} className="form-select">
            <option>{Small}</option>
            <option>{Medium}</option>
            <option>{Big}</option>
          </Field>
        </FormGroup>
      </Col>
      <Col sm="4">
        <FormGroup className="d-flex flex-column align-items-stretch">
          <Label check>{StartingDate}</Label>
          <ReactDatePicker className="datepicker-here form-control" selected={startDate} onChange={(date: Date | null) => setStartDate(date)} />
        </FormGroup>
      </Col>
      <Col sm="4">
        <FormGroup className="d-flex flex-column align-items-stretch">
          <Label check>{EndingDate}</Label>
          <ReactDatePicker className="datepicker-here form-control" selected={endDate} onChange={(date: Date | null) => setEndDate(date)} />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default DateSection;
