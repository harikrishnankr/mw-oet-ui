import { Button, Empty, message, Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../../core/apiService";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { isMobileDevice } from "../../core/utils";
import { AddSlots } from "./AddSlots";
import { SlotList } from "./SlotList";
import "./Slots.scss";

const { TabPane } = Tabs;
const { confirm } = Modal;

export interface ISlot {
    name: string;
    slotStartTme: string,
    slotEndTme: string
}

interface IPane {
    title: string;
    key: string;
    closable: boolean;
    slots: ISlot[]
}

export function Slots() {
    const [activeKey, setActiveKey] = useState('');
    const [panes, setPanes] = useState<IPane[]>([]);
    const [isAddOpen, toggleAdd] = useState(false);
    const isMobile = isMobileDevice();

    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: string) => {
        const removeSlot = () => {
            let newActiveKey = activeKey;
            let lastIndex = -1;
            panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            const newPanes = panes.filter(pane => pane.key !== targetKey);
            if (newPanes.length && newActiveKey === targetKey) {
                if (lastIndex >= 0) {
                    newActiveKey = newPanes[lastIndex].key;
                } else {
                    newActiveKey = newPanes[0].key;
                }
            }
            toggleSpinner(true);
            deleteRequest({ url: `/slot/remove/${targetKey}` })
            .then(() => {
                toggleSpinner(false);
                message.success("Successfully deleted slot");
                setPanes(newPanes);
                setActiveKey(newActiveKey);
            })
            .catch(() => {
                toggleSpinner(false);
                message.error("Couldn't delete slot");
            });
        };

        confirm({
            title: 'Warning',
            icon: '',
            content: 'Do you Want to remove this time slot ?',
            onOk() {
                removeSlot();
            },
            onCancel() {
              console.log('Cancel');
            }
        });
    };

    const onEdit = (targetKey: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove') => {
        if (action === 'add') {
            toggleAddModal();
        } else {
            remove(targetKey as string);
        }
    };

    const toggleAddModal = () => {
        if (isAddOpen) {
            getAllSlots();
        }
        toggleAdd(open => !open);
    };

    const getAllSlots = () => {
        toggleSpinner(true);
        getRequest({ url: "/slot/list" })
        .then((res) => {
            toggleSpinner(false);
            const newPanes = res.data.map((pane: any) => {
                const slots = pane.slots.map((slot: any, i: number ) => ({...slot, key: "slot_key_"+i+1}))
                return { title: pane.name, key: pane.id, closable: true, slots: slots||[] }
            });
            setPanes(newPanes);
            if (newPanes?.length) {
                const newActiveKey = newPanes[0].key;
                setActiveKey(newActiveKey);
            }
        })
        .catch(() => {
            toggleSpinner(false);
            message.error("Couldn't fetch time slots");
        });
    };

    useEffect(() => {
        getAllSlots();
    }, []);

    return (
        <PageWrapper title="Slots" subTitle={!isMobile ? "View and Add Slot" : ""}>
            {
                <div className="Slots-warning__Wrapper">
                    Click on + button to add new time slots.
                </div>
            }
            <div className="Slots__Wrapper">
                <Tabs type="editable-card" onChange={onChange} activeKey={activeKey} onEdit={onEdit}>
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            <SlotList slots={pane.slots||[]} slotId={pane.key}/>
                        </TabPane>
                    ))}
                </Tabs>
                {
                    !panes?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={
                        <span>
                          No Time slots added.
                        </span>
                    }>
                        <Button type="primary" onClick={toggleAddModal}>Add Slots</Button>
                    </Empty>
                }
            </div>
            <AddSlots isOpen={isAddOpen} toggleModal={toggleAddModal} />
        </PageWrapper>
    )
}
