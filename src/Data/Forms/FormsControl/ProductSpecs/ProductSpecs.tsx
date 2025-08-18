import { ProductSpecsProps, SpecificationsProps } from "@/Type/Forms/FormControls/FormsControls";
import * as Yup from "yup";

export const ProductSpecsInitialValue: ProductSpecsProps = {
    specifications: [
        {
            type: { label: "", value: 0 },
            value: ""
        }
    ]
};

export const ProductSpecsValidation = Yup.object({
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
