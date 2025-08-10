import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { AddNewProduct, ProductEntryHeading, ProductHeading } from '@/Constant';
import useFetch from '@/network';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { Card, CardBody, Col, Container } from 'reactstrap';
import ProductForm from './ProductForm';
import { ProductValidationProp } from '@/Type/Forms/FormControls/FormsControls';
import { isNotNull } from '@/utils/Utilities';
import api_urls from '@/network/apiUrls';
import { toast } from 'react-toastify';

const ProductEntry = () => {

    const { post, put, loading } = useFetch();

    const router = useRouter();

    const params = useParams();

    console.log("params", params)

    const handleSubmitProduct = async (values: ProductValidationProp, { resetForm }: { resetForm: () => void }) => {
        let body: any = { ...values };
        body["brand"] = values?.brand?.value;
        body["category"] = values?.category?.value
        console.log("body", body);
        if (!isNotNull(params?.params?.[0])) {
            // Create new product
            try {
                let response: any = await post(api_urls?.products, body);
                console.log("RESPONSE", response);
                if (response?.status === 201) {
                    toast.success(response?.message);
                    router.push(`/products/entry/${response?.data?.id}/`);
                } else {
                    toast.error(response?.message);
                }
            } catch (error: any) {
                console.log("ERROR", error);
                toast.error(error?.message);
            }
        } else {
            // Update product
            try {
                let response: any = await put(`${api_urls?.products}${params?.params?.[0]}/`, body);
                console.log("RESPONSE", response);
                if (response?.status === 200) {
                    toast.success(response?.message);
                    router.push(`/products/entry/${response?.data?.id}/`);
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
            <Breadcrumbs mainTitle={ProductEntryHeading} parent={ProductHeading} />
            <Container fluid className="product-entry">
                <Col md="6" lg="12">
                    <Card>
                        <CardHeaderCommon title={AddNewProduct} />
                        <CardBody>
                            <ProductForm handleSubmitProduct={handleSubmitProduct} />
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        </div>
    )
}

export default ProductEntry;