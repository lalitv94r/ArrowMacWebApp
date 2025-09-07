import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { GroupsHeading, GroupsList } from '@/Constant';
import useFetch from '@/network'
import api_urls from '@/network/apiUrls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Table } from 'reactstrap';
import ModalAlert from '../UiKits/Modal/ModalAlert';
import NoDataFound from '../UiKits/NoDataFound/NoDataFound';
import PaginationComponent from '../BonusUi/Pagination/Pagination';

const Groups: React.FC = () => {

    const { get, del, loading } = useFetch();

    const [search, setSearch] = useState<string>("");

    const [refresh, setRefresh] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [groups, setGroups] = useState<any>({});

    const router = useRouter();

    useEffect(() => {
        const fetchGroupList = async () => {
            try {
                const result = await get(`${api_urls?.group}?page=${currentPage}&search=${search}`);
                if (result?.status === 200) {
                    setGroups(result?.data);
                } else {
                    toast.error(result?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            } finally {
                setRefresh(false);
            }
        }
        fetchGroupList();
    }, [refresh, search, currentPage]);

    const deleteItem = async (item: any) => {
        try {
            let result: any = await del(`${api_urls?.group}${item?.id}/`);
            if (result?.status === 200) {
                toast.success(result?.message);
            } else {
                toast.error(result?.message);
            }
            setRefresh(true);
        } catch (error: any) {
            toast.error(error?.message);
        }
    }

    return (
        <div>
            {
                loading && <TransparentLoader />
            }
            <Breadcrumbs mainTitle={GroupsList} parent={GroupsHeading} />
            <Card className="hoverable-table">
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <Form className="theme-form w-25">
                            <FormGroup>
                                <Input
                                    type="text"
                                    placeholder="Search group..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => router?.push('/groups/entry')}
                            >
                                Add New Group
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {
                        groups?.results?.length > 0 ?
                            <Fragment>
                                <Table hover size={"md"} responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            groups?.results?.map((i: any, idx: React.Key) => (
                                                <tr key={i?.id}>
                                                    <td>{(Number(idx) + 1).toString()}</td>
                                                    <td>{i?.name}</td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <Link href={`/groups/entry/${i?.id}`}>
                                                                <FaRegEdit
                                                                    size={20}
                                                                    className={'text-secondary me-2'}
                                                                />
                                                            </Link>
                                                            <ModalAlert
                                                                onActionClick={() => deleteItem(i)}
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </Table>
                                <PaginationComponent
                                    activePage={currentPage}
                                    pages={groups?.count}
                                    onActivePageChange={(num: any) => setCurrentPage(num)}
                                />
                            </Fragment>
                            :
                            <NoDataFound />
                    }
                </CardBody>
            </Card>
        </div>
    )
}

export default Groups;