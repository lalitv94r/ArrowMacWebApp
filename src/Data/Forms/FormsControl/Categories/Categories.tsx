import { CategoryValidationProp } from "@/Type/Forms/FormControls/FormsControls";
import * as Yup from "yup";

export const CategoryInitialValues: CategoryValidationProp = {
    name: "",
    slug: ""
};

export const CategoryValidation = Yup.object().shape({
    name: Yup.string()?.required("Please enter a valid category name"),
    slug: Yup.string()?.required("Please enter a valid category slug")
});