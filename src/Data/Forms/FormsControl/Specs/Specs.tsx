import { SpecificationsProps } from "@/Type/Forms/FormControls/FormsControls";
import * as Yup from "yup";

export const SpecificationInitialValue: SpecificationsProps = {
    name: "",
    unit: ""
};

export const SpecificationValidation = Yup.object().shape({
    name: Yup.string()?.required("Please enter a valid specification name"),
    unit: Yup.string()?.required("Please enter a valid specification unit")
});