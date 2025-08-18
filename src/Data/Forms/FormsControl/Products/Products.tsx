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
    is_active: true,
    specifications: [{ type: { label: "", value: "" }, value: "" }],
    images: [],
    primary_images: [],
    secondary_images: [],
    delete_ids: []
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
    is_active: Yup.bool()?.required("Please select a valid value"),
    specifications: Yup.array().of(
        Yup.object().shape({
            type: Yup.object().shape({
                label: Yup.string().required('Specification type is required'),
                value: Yup.mixed()
                    .required('Value is required')
                    // optionally, you can enforce string or number explicitly
                    .test(
                        'is-string-or-number',
                        'Value must be string or number',
                        val => typeof val === 'string' || typeof val === 'number'
                    ),
            }),
            value: Yup.string().required('Specification value is required'),
        })
    )
});