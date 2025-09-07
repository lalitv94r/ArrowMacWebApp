import { FormikErrors } from "formik";
import { exportPages } from "next/dist/export/worker";

export interface VariationRadioProp {
  id: number;
  labelText: string;
  image?: string;
  icon?: string;
  name?: string;
  defaultChecked?: boolean;
  iconColor?: string;
}

export interface CommonCardFooterProp {
  footerClass?: string;
  color1: string;
  btn2Class?: string;
  btn1Class?: string;
  color2: string;
}

interface StarProp {
  id: number;
  starClass?: string;
}

export interface VerticalStyleFormProp {
  id: number;
  color: string;
  cardClass?: string;
  name?: string;
  badgeTitle: string;
  mediaBodyClass?: string;
  digits: string;
  spanText: string;
  check?: boolean;
  spanClass?: string;
  star?: StarProp[];
}

export interface HorizontalStyleFormProp {
  id: number;
  color: string;
  name: string;
  mediaBodyClass?: string;
  badgeTitle: string;
  digits: string;
  spanText: string;
  colClass?: string;
  check?: boolean;
  spanClass?: string;
  star?: StarProp[];
  cardClass?: string;
}

export interface TooltipValidationProp {
  firstname: string;
  lastname: string;
  username: string;
  city: string;
  state: string;
  zip: string;
}

export interface TooltipFormValidationProp {
  submitErrors: boolean;
  setSubmitError: (key: boolean) => void;
  errors: FormikErrors<TooltipValidationProp>;
}

export interface FormValidationProp {
  firstname: string;
  password: string;
  state: string;
  city: string;
  zip: string;
  payment: string;
  theme: string;
  file: string;
  description: string;
  terms: [];
}

export interface FormValidationsProp {
  submitErrors: boolean;
  setSubmitError: (key: boolean) => void
  errors: FormikErrors<FormValidationProp>;
}
export interface ButtonDropdownListProp {
  color: string;
  title?: string;
  options: string[];
  outline?: boolean;
  divider: boolean;
}
export interface CustomFormSelectProp {
  inputId: string;
  options: string[];
  title: string;
}
export interface TooltipValidationProp {
  firstname: string;
  lastname: string;
  username: string;
  city: string;
  state: string;
  zip: string;
}

export interface FormValidationProp {
  firstname: string;
  password: string;
  state: string;
  city: string;
  zip: string;
  payment: string;
  theme: string;
  file: string;
  description: string;
  terms: [];
}

// ---------------Brands---------------

export interface BrandValidationProp {
  name: string;
  slug: string;
}

export interface BrandFormProps {
  handleSubmitBrand: (value: BrandValidationProp, { resetForm }: { resetForm: () => void }) => void;
}

// -------------Categories--------------

export interface CategoryValidationProp {
  name: string;
  slug: string;
}

export interface CategoryFormProps {
  handleSubmitCategory: (value: CategoryValidationProp, { resetForm }: { resetForm: () => void }) => void;
}

// ---------Specifications---------
export interface SpecificationsProps {
  id?: string | number;
  name: string;
  unit: string;
}

export interface SpecsFormProps {
  handleSubmitSpecs: (value: SpecificationsProps, { resetForm }: { resetForm: () => void }) => void;
}

// -------Product Specs----------
export interface SingleProductSpec {
  type: {
    label: string;
    value: string | number;
  };
  value: string;
}

export interface ProductSpecsProps {
  specifications: Array<SingleProductSpec>
}

export interface ProductSpecFormProp {
  handleSubmitProductSpecs: (value: ProductSpecsProps, { resetForm }: { resetForm: () => void }) => void;
}

// --------------Products---------------

export interface DDValidationProps {
  label: string;
  value: number | string;
}

export interface ProductImageProps {
  image: any;
  is_primary: boolean;
}

export interface ProductValidationProp {
  name: string;
  slug: string;
  brand: DDValidationProps;
  category: DDValidationProps;
  description: string;
  base_price: number | string;
  discount_amount: number | string;
  is_active: boolean;
  specifications: Array<SingleProductSpec>
  images: any;
  primary_images: Array<ProductImageProps>,
  secondary_images: Array<ProductImageProps>,
  delete_ids: Array<any>
}

export interface ProductFormProps {
  handleSubmitProduct: (value: ProductValidationProp, { resetForm }: { resetForm: () => void }) => void;
}

// -------------Aync Drop Down -------------
export interface AsyncDropDownProp {
  onSelect: (args: any) => void;
  isCreatable?: boolean;
  value: any;
  searchKey?: string;
  apiEndPoint: string;
  placeholder?: string;
}

export interface ddOption {
  value: string | number;
  label: string;
}

// ------------Check Box-------------
export interface CheckBoxProps {
  label: string;
  onCheck: (args: any) => void;
  check: boolean;
}

// --------------Groups---------------

export interface GroupValidationProp {
  name: string;
}

export interface GroupFormProps {
  handleSubmitGroup: (value: GroupValidationProp, { resetForm }: { resetForm: () => void }) => void;
}

//--------------Users-----------------

export interface UserValidationProps {
  phone: string | number;
  email: string;
  title: string;
  full_name: string;
  address: string;
  city: string;
  state: string;
  group: ddOption;
}

export interface UserFromProps {
  handleSubmitUser: (value: UserValidationProps, { resetForm }: { resetForm: () => void }) => void;
}