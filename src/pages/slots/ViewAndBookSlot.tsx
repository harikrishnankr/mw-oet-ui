import { Button, message, Modal, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { postRequest } from "../../core/apiService";
import { DATE_FORMAT } from "../../core/constants/common";
import { ISlot } from "./Slots";

interface IViewAndBookSlot {
    isOpen: boolean;
    slots: ISlot[];
    toggleModal: () => any;
    bookingDate: Moment|undefined;
}

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

export function ViewAndBookSlot({ isOpen, slots, toggleModal, bookingDate }: IViewAndBookSlot) {
    const [eventList, setEventList] = useState([]);

    const bookEvent = (slot: any) => {
        const payload = {
            date: bookingDate?.format("YYYY-MM-DD"),
            slotStartTme: slot.slotStartTme,
            slotEndTme: slot.slotEndTme,
            eventName: slot.name
        };
        postRequest({ url: "/notifications/book", payload })
        .then(() => {
            message.success("Successfully booked the slot.");
            toggleModal();
        })
        .catch(() => {
            message.error("Could not book the slot. Please try again.");
        });
    };

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            width: '180px'
        },
        {
            title: 'Start Time',
            key: 'slotStartTme',
            dataIndex: 'slotStartTme',
            width: '130px'
        },
        {
            title: 'End Time',
            key: 'slotEndTme',
            dataIndex: 'slotEndTme',
            width: '130px'
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: '100px',
            render: (text, record, index) => <Button type="primary" ghost onClick={() => bookEvent(record)}>Book</Button>,
        },
    ];

    useEffect(() => {
        if (slots) {
            setEventList(
                slots
                .map((s, i) => ({...s, key: "KEY_"+i+1}))
                .sort((a, b) => {
                    return moment(a.slotStartTme, "hh:mm a").diff(moment(b.slotStartTme, "hh:mm a"));
                }) as any
            );
        }
    }, [slots]);
    
    return (
        <Modal title="Book Slots" visible={isOpen} className="View-slot__wrapper" onCancel={toggleModal} footer={null}>
            { eventList && <Table columns={columns as any} dataSource={eventList} /> }
        </Modal>
    )
}