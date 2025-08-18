import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import CardHeaderCommon from '@/CommonComponent/CommonCardHeader/CardHeaderCommon';
import { AddNewProduct, ProductEntryHeading, ProductHeading, UpdateProduct } from '@/Constant';
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

    const handleSubmitProduct = async (
        values: ProductValidationProp,
        { resetForm }: { resetForm: () => void }
    ) => {
        console.log("VALUES>>", values);
        try {
            const formData = new FormData();

            // --------------------------
            // Base product data (JSON only)
            // --------------------------
            let body: any = { ...values };
            body.brand = values?.brand?.value;
            body.category = values?.category?.value;

            // Format specifications
            body.specifications = values?.specifications?.map((i: any) => ({
                type: i?.type?.value,
                value: i?.value,
            }));

            // --------------------------
            // Handle images
            // --------------------------
            const existingImages =
                values.images?.map((i: any) => ({
                    id: i?.id,
                    is_primary: i?.is_primary,
                })) || [];

            // keep only IDs in JSON body for existing ones
            body.images = existingImages;

            // New files (primary + secondary)
            const newFiles = [
                ...(values.primary_images || []),
                ...(values.secondary_images || []),
            ];

            newFiles.forEach((img: any, index: number) => {
                if (img?.image instanceof File) {
                    formData.append(`images[${index}][image]`, img.image);
                    formData.append(
                        `images[${index}][is_primary]`,
                        String(img.is_primary)
                    );
                }
            });

            console.log("BODY>>", body);

            // --------------------------
            // Add non-file data
            // --------------------------
            formData.append("data", JSON.stringify(body));

            // --------------------------
            // API call: create or update
            // --------------------------
            const isEdit = Boolean(params?.params?.[0]);
            const url = isEdit
                ? `${api_urls.products}${params?.params?.[0]}/`
                : api_urls.products;

            const response: any = isEdit
                ? await put(url, formData)
                : await post(url, formData);

            if (
                (isEdit && response?.status === 200) ||
                (!isEdit && response?.status === 201)
            ) {
                toast.success(response?.message || "Product saved successfully!");
                // router.push(`/products`);
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        } catch (error: any) {
            console.error("ERROR", error);
            toast.error(error?.message || "An error occurred");
        }
    };


    return (
        <div>
            {
                loading && <TransparentLoader />
            }
            <Breadcrumbs mainTitle={ProductEntryHeading} parent={ProductHeading} />
            <Container fluid className="product-entry">
                <Col md="6" lg="12">
                    <Card>
                        <CardHeaderCommon title={!isNotNull(params?.params?.[0]) ? AddNewProduct : UpdateProduct} />
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