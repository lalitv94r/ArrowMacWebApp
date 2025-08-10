import { ProductValidationProp } from "@/Type/Forms/FormControls/FormsControls";
import * as Yup from "yup";

export const ProductInitialValues: ProductValidationProp = {
    name: "",
    slug: "",
    brand: {
        label: "",
        value: ""
    },
    category: {
        label: "",
        value: ""
    },
    description: "",
    base_price: "",
    discount_amount: "",
    is_active: true
};

export const ProductValidation = Yup.object().shape({
    name: Yup.string()?.required("Please enter a valid product name"),
    slug: Yup.string()?.required("Please enter a valid product slug"),
    brand: Yup.object()?.shape({
        label: Yup?.string()?.required("Please select a valid brand"),
        value: Yup?.number()?.required("Please select a valid brand")
    }),
    category: Yup.object()?.shape({
        label: Yup?.string()?.required("Please select a valid category"),
        value: Yup?.number()?.required("Please select a valid category")
    }),
    description: Yup.string()?.notRequired(),
    base_price: Yup?.number()?.required("Please enter non negative integer value"),
    discount_amount: Yup?.number()?.required("Please enter non negative integer value"),
    is_active: Yup.bool()?.required("Please select a valid value")
});