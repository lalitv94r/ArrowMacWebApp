import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { UserHeading, UsersListHeading } from '@/Constant';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Form, FormGroup, Input, Table } from 'reactstrap';
import ModalAlert from '../UiKits/Modal/ModalAlert';
import PaginationComponent from '../BonusUi/Pagination/Pagination';
import NoDataFound from '../UiKits/NoDataFound/NoDataFound';
import { getTitleKey } from '@/utils/Utilities';

const UsersList = () => {

    const { get, del, loading } = useFetch();

    const [search, setSearch] = useState<string>("");

    const [refresh, setRefresh] = useState(false);

    const [currentPage, setCurrentPage] = useState<number>(1);

    const [users, setUsers] = useState<any>({});

    const router = useRouter();

    useEffect(() => {
        const fetchUsersList = async () => {
            try {
                const result = await get(`${api_urls?.users}?page=${currentPage}&search=${search}`);
                console.log("RESULTS", result);
                if (result?.status === 200) {
                    setUsers(result?.data);
                } else {
                    toast.error(result?.message);
                }
            } catch (error: any) {
                toast.error(error?.message);
            } finally {
                setRefresh(false);
            }
        }
        fetchUsersList();
    }, [refresh, search, currentPage]);

    const deleteItem = async (item: any) => {
        try {
            let result: any = await del(`${api_urls?.users}${item?.id}/`);
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
            <Breadcrumbs mainTitle={UsersListHeading} parent={UserHeading} />
            <Card className="hoverable-table">
                <CardHeader>
                    <div className="d-flex justify-content-between">
                        <Form className="theme-form w-25">
                            <FormGroup>
                                <Input
                                    type="text"
                                    placeholder="Search users..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => router?.push('/user/entry')}
                            >
                                Add New User
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {
                        users?.results?.length > 0 ?
                            <Fragment>
                                <Table hover size={"md"} responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Full Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Groups</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users?.results?.map((i: any, idx: React.Key) => (
                                                <tr key={i?.id}>
                                                    <td>{(Number(idx) + 1).toString()}</td>
                                                    <td>{`${getTitleKey(i?.title)} ${i?.first_name} ${i?.last_name}`}</td>
                                                    <td>{i?.email}</td>
                                                    <td>{i?.phone}</td>
                                                    <td>{i?.groups?.join(',')}</td>
                                                    <td>
                                                        <div className='d-flex'>
                                                            <Link href={`/user/entry/${i?.id}`}>
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
                                    pages={users?.count}
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

export default UsersList;