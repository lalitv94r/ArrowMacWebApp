import { UserValidationProps } from "@/Type/Forms/FormControls/FormsControls";
import * as Yup from "yup";

export const UserInitialValues: UserValidationProps = {
    title: "",
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    group: {
        value: 0,
        label: ""
    }
};

export const UserValidation = Yup.object().shape({
    title: Yup.string().required("Please select a valid title."),
    full_name: Yup.string().required("Please enter a valid name."),
    email: Yup.string()
        .required("Please enter a valid email address.")
        .email("Please enter a valid email address.")
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Email address must be a valid email address."
        ),
    phone: Yup.string()
        .required("Please enter a valid phone number.")
        .matches(/^\d{10}$/, "Phone number must be exactly 10 digits."),
    address: Yup.string().required("Please enter a valid address."),
    city: Yup.string().required("Please enter a valid city."),
    state: Yup.string().required("Please enter a valid state."),
    group: Yup.object()?.shape({
        label: Yup?.string()?.required("Please select a valid group"),
        value: Yup?.number()?.required("Please select a valid group")
    })
});