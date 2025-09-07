import { address, city, email, enterAddress, enterCity, enterEmail, enterfullName, enterPhone, fullName, groupLabel, phone, selectGroup, selectState, selectTitle, state } from '@/Constant';
import { UserInitialValues, UserValidation } from '@/Data/Forms/FormsControl/Users/Users';
import { UserFromProps, UserValidationProps } from '@/Type/Forms/FormControls/FormsControls';
import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import InputSelect from '../BonusUi/InputSelect/InputSelect';
import { NameTitle, StateOptions } from '@/utils/localData';
import AsyncDropDown from '../UiKits/AsyncDropDown/AsyncDropDown';
import api_urls from '@/network/apiUrls';
import { isNotNull } from '@/utils/Utilities';
import { useParams, useRouter } from 'next/navigation';
import useFetch from '@/network';
import { toast } from 'react-toastify';

const UsersFrom = ({
    handleSubmitUser
}: UserFromProps) => {

    const params = useParams();

    const route = useRouter();

    const { get } = useFetch();

    return (
        <div>
            <Formik
                initialValues={UserInitialValues}
                onSubmit={handleSubmitUser}
                validationSchema={UserValidation}
            >
                {({ handleChange, resetForm, submitForm, values, setFormikState, setFieldValue, errors }) => {

                    useEffect(() => {
                        const fetchUserById = async () => {
                            try {
                                let result: any = await get(`${api_urls?.users}${params?.params?.[0]}/`);
                                console.log("result>>>", result);
                                if (result?.status === 200) {
                                    // Use setValues to update form fields
                                    setFormikState((prevState: any) => ({
                                        ...prevState,
                                        values: {
                                            ...prevState.values,
                                            title: result?.data?.title,
                                            full_name: `${result?.data?.first_name} ${result?.data?.last_name}` || '',
                                            email: result?.data?.email,
                                            phone: result?.data?.phone,
                                            address: result?.data?.address,
                                            city: result?.data?.city,
                                            state: result?.data?.state
                                        }
                                    }));
                                    try {
                                        let groupResult: any = await get(`${api_urls?.group}?page=1&search=${result?.data?.groups?.[0]}`)
                                        if (groupResult?.status === 200) {
                                            console.log("groupResult?.data?.results?.[0]?.id", {
                                                value: groupResult?.data?.results?.[0]?.id,
                                                label: groupResult?.data?.results?.[0]?.name
                                            })
                                            setFormikState((prevState: any) => ({
                                                ...prevState,
                                                values: {
                                                    ...prevState?.values,
                                                    group: {
                                                        value: groupResult?.data?.results?.[0]?.id,
                                                        label: groupResult?.data?.results?.[0]?.name
                                                    }
                                                }
                                            }))
                                        }
                                    } catch (error: any) {
                                        toast.error(error?.message);
                                    }
                                } else {
                                    toast.error(result?.message);
                                }
                            } catch (error: any) {
                                toast.error(error?.message);
                            }
                        }
                        if (isNotNull(params?.params?.[0])) {
                            fetchUserById();
                        }
                    }, [params?.params]);

                    return (
                        <Form className="theme-form">
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{fullName}</Label>
                                        <InputSelect
                                            selectProps={{
                                                name: "title",
                                                value: values.title,
                                                onChange: (e: any) => setFieldValue("title", e),
                                                options: NameTitle,
                                                placeholder: selectTitle,
                                            }}
                                            inputProps={{
                                                name: "full_name",
                                                value: values?.full_name,
                                                onChange: handleChange,
                                                placeholder: enterfullName
                                            }}
                                        />
                                        <div className='d-flex justify-content-start'>
                                            {errors.title ? (
                                                <div className="text-danger">
                                                    {errors.title}
                                                </div>
                                            ) : <div className='w-25' />}
                                            {errors.full_name && (
                                                <div className="text-danger">
                                                    {errors.full_name}
                                                </div>
                                            )}
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{email}</Label>
                                        <Input
                                            name="email"
                                            value={values.email}
                                            type={'email'}
                                            onChange={handleChange}
                                            placeholder={enterEmail}
                                        />
                                        {errors.email && (
                                            <div className="text-danger">
                                                {errors.email}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{phone}</Label>
                                        <Input
                                            name="phone"
                                            value={values.phone}
                                            type={'tel'}
                                            onChange={handleChange}
                                            placeholder={enterPhone}
                                        />
                                        {errors.phone && (
                                            <div className="text-danger">
                                                {errors.phone}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{address}</Label>
                                        <Input
                                            name="address"
                                            value={values.address}
                                            type={'text'}
                                            onChange={handleChange}
                                            placeholder={enterAddress}
                                        />
                                        {errors.address && (
                                            <div className="text-danger">
                                                {errors.address}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{city}</Label>
                                        <Input
                                            name="city"
                                            value={values.city}
                                            type={'text'}
                                            onChange={handleChange}
                                            placeholder={enterCity}
                                        />
                                        {errors.city && (
                                            <div className="text-danger">
                                                {errors.city}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <Label>{state}</Label>
                                        <Input
                                            name="state"
                                            value={values.state}
                                            type={'select'}
                                            onChange={handleChange}
                                            placeholder={selectState}
                                        >
                                            {
                                                StateOptions?.map((i: any, idx: any) => (
                                                    <option key={idx} value={i?.value}>{i?.key}</option>
                                                ))
                                            }
                                        </Input>
                                        {errors.state && (
                                            <div className="text-danger">
                                                {errors.state}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{groupLabel}</Label>
                                        <AsyncDropDown
                                            onSelect={(value: any) => setFieldValue("group", value)}
                                            value={values?.group}
                                            apiEndPoint={api_urls?.group}
                                            placeholder={selectGroup}
                                        />
                                        {errors.group?.label && (
                                            <div className="text-danger">
                                                {errors.group?.label}
                                            </div>
                                        )}
                                    </FormGroup>
                                </Col>
                                <Col></Col>
                            </Row>
                            {
                                isNotNull(params?.params) ?
                                    <FormGroup className="d-flex justify-content-end gap-2 mt-3">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => route?.push('/user')}
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

export default UsersFrom;