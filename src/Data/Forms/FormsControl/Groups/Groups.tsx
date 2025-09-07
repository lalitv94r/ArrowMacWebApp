import { GroupValidationProp } from "@/Type/Forms/FormControls/FormsControls";
import * as Yup from "yup";

export const GroupInitialValues: GroupValidationProp = {
    name: "",
};

export const GroupValidation = Yup.object().shape({
    name: Yup.string()?.required("Please enter a valid group name"),
});