import { BrandValidationProp } from "@/Type/Forms/FormControls/FormsControls";
import * as Yup from "yup";

export const BrandInitialValues: BrandValidationProp = {
    name: "",
    slug: ""
};

export const BrandValidation = Yup.object().shape({
    name: Yup.string()?.required("Please enter a valid brand name"),
    slug: Yup.string()?.required("Please enter a valid brand slug")
});