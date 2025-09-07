import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { AddNewUser, phone, UserEntryHeading, UserHeading } from '@/Constant';
import useFetch from '@/network';
import React from 'react'
import { Card, CardBody, Col, Container } from 'reactstrap';
import UsersFrom from './UsersFrom';
import { UserValidationProps } from '@/Type/Forms/FormControls/FormsControls';
import { isNotNull } from '@/utils/Utilities';
import api_urls from '@/network/apiUrls';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';

const UsersEntry = () => {

    const { post, put, loading } = useFetch();

    const router = useRouter();

    const params = useParams();

    const handleSubmitUser = async (values: UserValidationProps, { resetForm }: { resetForm: () => void }) => {
        console.log("values", values);
        let body: any = {
            title: values?.title,
            first_name: values?.full_name?.split(" ")?.[0] ?? "",
            last_name: values?.full_name?.split(" ")?.[1] ?? "",
            email: values?.email,
            phone: values?.phone,
            password: "test@123",
            address: values?.address,
            city: values?.city,
            state: values?.state,
            group: values?.group?.label
        }

        console.log({ body });
        if (!isNotNull(params?.params?.[0])) {
            // Create new user
            try {
                let response: any = await post(api_urls?.users, body);
                console.log("RESPONSE", response);
                if (response?.status === 201) {
                    toast.success(response?.message);
                    router.push('/user');
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                console.log("ERROR", error);
                toast.error(error?.message);
            }
        } else {
            // Update user
            try {
                let response: any = await put(`${api_urls?.users}${params?.params?.[0]}/`, body);
                console.log("RESPONSE", response);
                if (response?.status === 200) {
                    toast.success(response?.message);
                    router.push('/user');
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                console.log("ERROR", error);
                toast.error(error?.message);
            }
        }
    }

    return (
        <div>
            {
                loading && <TransparentLoader />
            }
            <Breadcrumbs mainTitle={UserEntryHeading} parent={UserHeading} />
            <Container fluid className="user-entry">
                <Col md="12" lg="12">
                    <Card>
                        <CardHeaderCommon title={AddNewUser} />
                        <CardBody>
                            <UsersFrom handleSubmitUser={handleSubmitUser} />
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </div>
    )
}

export default UsersEntry;