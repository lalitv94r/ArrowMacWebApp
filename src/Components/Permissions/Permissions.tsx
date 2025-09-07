import TransparentLoader from '@/app/transparentLoader';
import Breadcrumbs from '@/CommonComponent/Breadcrumbs/Breadcrumbs';
import { PermissionsHeading } from '@/Constant';
import useFetch from '@/network';
import api_urls from '@/network/apiUrls';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row, Button } from 'reactstrap';

const Permissions = () => {
    const { get, post, loading } = useFetch();

    const [groups, setGroups] = useState<any[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<any>(null);
    const [groupPermissions, setGroupPermissions] = useState<number[]>([]);

    // Fetch groups
    useEffect(() => {
        get(api_urls?.groups_permission)
            .then((result: any) => {
                if (result?.status === 200) {
                    setGroups(result?.data || []);
                } else {
                    toast.error(result?.message);
                }
            })
            .catch((error) => toast.error(error?.message));
    }, []);

    // Fetch permissions
    useEffect(() => {
        get(api_urls?.permissions)
            .then((result: any) => {
                if (result?.status === 200) {
                    setPermissions(result?.data || []);
                } else {
                    toast.error(result?.message);
                }
            })
            .catch((error) => toast.error(error?.message));
    }, []);

    // Fetch selected group's permissions
    useEffect(() => {
        get(`${api_urls?.groups_permission}`)
            .then((result: any) => {
                if (result?.status === 200) {
                    setGroupPermissions(result?.data?.find((i: any) => i?.name === selectedGroup?.name)?.permissions || []);
                } else {
                    toast.error(result?.message);
                }
            })
            .catch((error) => toast.error(error?.message));
    }, [selectedGroup]);

    // Handle group select
    const handleGroupSelect = (groupId: string) => {
        const group = groups.find((g) => g.id === Number(groupId));
        setSelectedGroup(group);
    };

    // Handle individual permission toggle
    const handlePermissionToggle = (permId: number) => {
        let updated = groupPermissions.includes(permId)
            ? groupPermissions.filter((id) => id !== permId)
            : [...groupPermissions, permId];
        setGroupPermissions(updated);
        savePermissions(updated);
    };

    // Handle section select/deselect all
    const handleSectionToggle = (section: any) => {
        const sectionIds = section.permissions.map((p: any) => p.id);
        const allSelected = sectionIds.every((id: number) => groupPermissions.includes(id));
        let updated = allSelected
            ? groupPermissions.filter((id) => !sectionIds.includes(id))
            : Array.from(new Set([...groupPermissions, ...sectionIds]));
        setGroupPermissions(updated);
        savePermissions(updated);
    };

    // Handle global select/deselect all
    const handleGlobalToggle = () => {
        const allIds = permissions.flatMap((section: any) => section.permissions.map((p: any) => p.id));
        const allSelected = allIds.every((id: number) => groupPermissions.includes(id));
        let updated = allSelected ? [] : allIds;
        setGroupPermissions(updated);
        savePermissions(updated);
    };

    // Save permissions to backend
    const savePermissions = async (updatedPermissions: number[]) => {
        // if (!selectedGroup) return;
        let body: any = {
            "name": selectedGroup?.name,
            "permissions": updatedPermissions
        }
        try {
            let result: any = await post(api_urls?.groups_permission, body);
            if (result?.status === 200) {
                toast.success('Permissions updated');
            } else {
                toast.error(result?.message);
            }
        } catch (error: any) {
            toast.error((error as Error)?.message || String(error));
        }
    };

    return (
        <div>
            {loading && <TransparentLoader />}
            <Breadcrumbs mainTitle={PermissionsHeading} />
            <Card className="hoverable-table">
                <CardHeader>
                    <div className="d-flex justify-content-end">
                        <div className='w-25'>
                            <FormGroup>
                                <Input type="select" className="border border-secondary btn-square digits" defaultValue={""}
                                    onChange={(e) => handleGroupSelect(e.target.value)}
                                >
                                    <option value="" disabled>-- Select a group --</option>
                                    {groups.map((item: any) => (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </div>
                    </div>
                </CardHeader>
                <CardBody>
                    {selectedGroup ? (
                        <Row>
                            <Col xs="12" className="mb-3 d-flex justify-content-end">
                                <Button color={permissions.flatMap((section: any) => section.permissions.map((p: any) => p.id))
                                    .every((id: number) => groupPermissions.includes(id)) ? "danger" : "primary"} onClick={handleGlobalToggle}>
                                    {permissions.flatMap((section: any) => section.permissions.map((p: any) => p.id))
                                        .every((id: number) => groupPermissions.includes(id))
                                        ? 'Deselect All' : 'Select All'}
                                </Button>
                            </Col>
                            {permissions.map((section: any, idx: any) => (
                                <Col xs="12" key={section.id} className="mb-3">
                                    <Card>
                                        <CardHeader className="bg-light py-2 d-flex align-items-center">
                                            <strong className="text-capitalize flex-grow-1">{section.label}</strong>
                                            <Input
                                                type="checkbox"
                                                id={`select-all-${section.id}-${idx}`}
                                                checked={section.permissions.every((p: any) => groupPermissions.includes(p.id))}
                                                onChange={() => handleSectionToggle(section)}
                                            />
                                            <Label className="ms-2 mb-0" for={`select-all-${section.id}-${idx}`}>Select All</Label>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                {section.permissions.map((perm: any) => (
                                                    <Col xs="4" key={perm.id} className="mb-2">
                                                        <FormGroup check className="d-flex align-items-center">
                                                            <Input
                                                                type="checkbox"
                                                                id={`checkbox-${section.id}-${perm.id}`}
                                                                value={perm.id}
                                                                checked={groupPermissions.includes(perm.id)}
                                                                onChange={() => handlePermissionToggle(perm.id)}
                                                            />
                                                            <Label for={`checkbox-${section.id}-${perm.id}`} className="ms-2 mb-0">
                                                                {perm.name}
                                                            </Label>
                                                        </FormGroup>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="text-center text-secondary">
                            <code>* Please select a group to manage permissions.</code>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default Permissions;
// ...existing code...