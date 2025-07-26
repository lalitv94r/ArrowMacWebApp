import { Col, InputGroup, Label, Row } from "reactstrap";
import { DefaultDates } from "@/Constant";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";

const DatePickerComponentFirst = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const handleChange = (date: Date | null) => setStartDate(date);
  return (
    <Row>
      <Col xxl="3">
        <Label className="box-col-12 text-start" check>
          {DefaultDates}
        </Label>
      </Col>
      <Col xxl="9" className="box-col-12">
        <InputGroup className="flatpicker-calender">
          <ReactDatePicker className="form-control flatpickr-input" selected={startDate} onChange={handleChange} />
        </InputGroup>
      </Col>
    </Row>
  );
};

export default DatePickerComponentFirst;
