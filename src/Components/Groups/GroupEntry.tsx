import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { AddNewGroup, GroupsEntryHeading, GroupsHeading } from '@/Constant';
import useFetch from '@/network';
import React from 'react'
import { Card, CardBody, Col, Container } from 'reactstrap';
import GroupForm from './GroupForm';
import { isNotNull } from '@/utils/Utilities';
import { useParams, useRouter } from 'next/navigation';
import api_urls from '@/network/apiUrls';
import { toast } from 'react-toastify';

const GroupEntry = () => {

    const params = useParams();

    const router = useRouter();

    const { post, put, loading } = useFetch();

    const handleSubmitGroup = async (values: any) => {
        let body = { ...values }
        console.log("body", body);
        if (!isNotNull(params?.params?.[0])) {
            // Create new brand
            try {
                let response: any = await post(api_urls?.group, body);
                console.log("RESPONSE", response);
                if (response?.status === 201) {
                    toast.success(response?.message);
                    router.push('/groups');
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                console.log("ERROR", error);
                toast.error(error?.message);
            }
        } else {
            // Update brand
            try {
                let response: any = await put(`${api_urls?.group}${params?.params?.[0]}/`, body);
                console.log("RESPONSE", response);
                if (response?.status === 200) {
                    toast.success(response?.message);
                    router.push('/groups');
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
            <Breadcrumbs mainTitle={GroupsEntryHeading} parent={GroupsHeading} />
            <Container fluid className="brand-entry">
                <Col md="6" lg="6">
                    <Card>
                        <CardHeaderCommon title={AddNewGroup} />
                        <CardBody>
                            <GroupForm handleSubmitGroup={handleSubmitGroup} />
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </div>
    )
}

export default GroupEntry