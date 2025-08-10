import { BasePrice, BasePricePlaceholder, Brand, Category, DescPlaceholder, Description, DiscountAmount, DiscountAmountPlaceholder, ProductName, ProductSlug, ProductSlugPlaceholder, ProudctNamePlaceholder, SelectBrand, SelectCategory } from '@/Constant';
import { ProductInitialValues, ProductValidation } from '@/Data/Forms/FormsControl/Products/Products';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import { ProductFormProps, ProductValidationProp } from '@/Type/Forms/FormControls/FormsControls';
import { isNotNull } from '@/utils/Utilities';
import { Formik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import AsyncDropDown from '../UiKits/AsyncDropDown/AsyncDropDown';
import CheckBox from '../UiKits/CheckBox/CheckBox';

const ProductForm = ({
    handleSubmitProduct
}: ProductFormProps) => {

    const params = useParams();

    const route = useRouter();

    const { get } = useFetch();

    const handleAutoGenerateSlug = (setFieldValue: any, e: any) => {
        setFieldValue('name', e?.target?.value);
        const slug = e?.target?.value?.toLowerCase()?.replace(/\s+/g, '-')?.replace(/[^\w-]+/g, '');
        setFieldValue('slug', slug);
    }

    return (
        <div>
            <Formik<ProductValidationProp>
                initialValues={ProductInitialValues}
                validationSchema={ProductValidation}
                onSubmit={handleSubmitProduct}
            >
                {({ values, handleChange, submitForm, resetForm, errors, setFieldValue, setFormikState }) => {
                    useEffect(() => {
                        const fetchProductById = async () => {
                            try {
                                let result: any = await get(`${api_urls?.products}${params?.params?.[0]}/`);
                                if (result?.status === 200) {
                                    // Use setValues to update form fields
                                    setFormikState((prevState: any) => ({
                                        ...prevState,
                                        values: {
                                            ...prevState.values,
                                            name: result?.data?.name || '',
                                            slug: result?.data?.slug || '',
                                            brand: {
                                                value: result?.data?.brand?.id || 0,
                                                label: result?.data?.brand?.name || ""
                                            },
                                            category: {
                                                value: result?.data?.category?.id || 0,
                                                label: result?.data?.category?.name || ""
                                            },
                                            base_price: result?.data?.base_price || 0,
                                            discount_amount: result?.data?.discount_amount || 0,
                                            description: result?.data?.description || "",
                                            is_active: result?.data?.is_active || true
                                        }
                                    }));
                                } else {
                                    toast.error(result?.message);
                                }
                            } catch (error: any) {
                                toast.error(error?.message);
                            }
                        }
                        if (isNotNull(params?.params?.[0])) {
                            fetchProductById();
                        }
                    }, [params?.params]);
                    return (
                        <Form className="theme-form">
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{ProductName}</Label>
                                        <Input
                                            name=""
                                            value={values.name}
                                            onChange={(e: any) => handleAutoGenerateSlug(setFieldValue, e)}
                                            placeholder={ProudctNamePlaceholder}
                                        />
                                        {errors.name && (
                                            <div className="text-danger">
                                                {errors.name}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{ProductSlug}</Label>
                                        <Input
                                            name="slug"
                                            value={values.slug}
                                            onChange={handleChange}
                                            placeholder={ProductSlugPlaceholder}
                                        />
                                        {errors.slug && (
                                            <div className="text-danger">
                                                {errors.slug}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{Brand}</Label>
                                        <AsyncDropDown
                                            onSelect={(value: any) => setFieldValue("brand", value)}
                                            value={values?.brand}
                                            apiEndPoint={api_urls?.brands}
                                            placeholder={SelectBrand}
                                        />
                                        {errors.brand?.value && (
                                            <div className="text-danger">
                                                {errors.brand?.value}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{Category}</Label>
                                        <AsyncDropDown
                                            onSelect={(value: any) => setFieldValue("category", value)}
                                            value={values?.category}
                                            apiEndPoint={api_urls?.category}
                                            placeholder={SelectCategory}
                                        />
                                        {errors.category?.value && (
                                            <div className="text-danger">
                                                {errors.brand?.value}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{BasePrice}</Label>
                                        <Input
                                            name="base_price"
                                            type={'number'}
                                            value={values.base_price}
                                            onChange={handleChange}
                                            placeholder={BasePricePlaceholder}
                                        />
                                        {errors.base_price && (
                                            <div className="text-danger">
                                                {errors.base_price}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{DiscountAmount}</Label>
                                        <Input
                                            name="discount_amount"
                                            type={'number'}
                                            value={values.discount_amount}
                                            onChange={handleChange}
                                            placeholder={DiscountAmountPlaceholder}
                                        />
                                        {errors.discount_amount && (
                                            <div className="text-danger">
                                                {errors.discount_amount}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <Label>{Description}</Label>
                                    <Input
                                        name={"description"}
                                        value={values?.description}
                                        type={'textarea'}
                                        onChange={handleChange}
                                        placeholder={DescPlaceholder}
                                    />
                                    {errors.description && (
                                        <div className="text-danger">
                                            {errors.description}
                                        </div>
                                    )}
                                </FormGroup>
                            </Row>
                            <Row>
                                <FormGroup>
                                    <CheckBox
                                        label='Status'
                                        check={values?.is_active}
                                        onCheck={(value: any) => setFieldValue("is_active", value)}
                                    />
                                </FormGroup>
                            </Row>
                            {
                                isNotNull(params?.params) ?
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => route?.push('/products')}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => submitForm()} // Update
                                        >
                                            Update
                                        </button>
                                    </FormGroup>
                                    :
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => resetForm()}
                                        >
                                            Reset
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => submitForm()} // Create
                                        >
                                            Save
                                        </button>
                                    </FormGroup>

                            }
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ProductForm;