import { Button, Input, Table, TimePicker, Modal, message } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import React, { useState } from "react";
import { postRequest } from "../../core/apiService";

const { confirm } = Modal;

interface ISlotList {
    slots: {
        name: string,
        slotStartTme: string,
        slotEndTme: string
    }[];
    slotId: string;
}

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

export function SlotList({ slots, slotId }: ISlotList) {
    const [eventList, setEventList] = useState<any[]>(slots||[]);
      
      const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            width: '180px',
            render: (text, record, index) => (
                <Input defaultValue={record.name} placeholder="Event Name" onChange={(e) => handleInputChange({ value: (e?.target?.value || ""), name: "name", index })}/>
            )
        },
        {
            title: 'Start Time',
            key: 'slotStartTme',
            dataIndex: 'slotStartTme',
            width: '130px',
            render: (text, record: any, index) => {
                const value  = record.slotStartTme ? moment(record.slotStartTme, "hh:mm a") : undefined;
                return <TimePicker defaultValue={value} use12Hours format="hh:mm a" placeholder="Start Time" onChange={(time) => handleInputChange({ value: time, name: "slotStartTme", index })} />
            }
        },
        {
            title: 'End Time',
            key: 'slotEndTme',
            dataIndex: 'slotEndTme',
            width: '130px',
            render: (text, record: any, index) => {
                const value  = record.slotEndTme ? moment(record.slotEndTme, "hh:mm a") : undefined;
                return <TimePicker defaultValue={value} use12Hours format="hh:mm a" placeholder="End Time" onChange={(time) => handleInputChange({ value: time, name: "slotEndTme", index })} />
            }
        },
        {
            title: 'Action',
            key: 'operation',
            fixed: 'right',
            width: '100px',
            render: (text, record, index) => <Button type="ghost" danger onClick={() => removeEvent(index)}>Remove</Button>,
        },
    ];

    const addEvent = () => {
        setEventList((list: any) => {
            list.push({ name: "", slotStartTme: "", slotEndTme: "", key: "slot_key_"+list.length+1 })

            return [...list];
        });
    };

    const removeEvent = (index: number) => {
        confirm({
            title: 'Warning',
            icon: '',
            content: 'Do you Want to remove this time slot ?',
            onOk() {
                setEventList((list: any) => [...list.filter((l: any, i: number) => i !== index)]);
            },
            onCancel() {
              console.log('Cancel');
            }
        });
    };

    const handleInputChange = ({ value, name, index }: any) => {
        setEventList((list: any) => {
            for(let i = 0; i <= list.length; i++) {
                if (i === index) {
                    list[i][name] = value;
                }
            }
            return list;
        });
    };

    const save = () => {
        const payload = eventList.map((event) => {
            return {
                name: event.name,
                slotEndTme: typeof event.slotEndTme === "string" ? event.slotEndTme : event.slotEndTme?.format("hh:mm a"),
                slotStartTme: typeof event.slotStartTme === "string" ? event.slotStartTme : event.slotStartTme?.format("hh:mm a")
            };
        })
        postRequest({ url: `/slot/update/${slotId}`, payload })
        .then((y) => {
            message.success("Successfully updated the slot information");
        })
        .catch(() => {
            message.error("Couldn't updated the slot information");
        });
    };

    return (
        <div>
            <div className="p-2 d-flex justify-content-end">
                <Button type="primary" onClick={addEvent}>Add Event</Button>
            </div>
            <div className="Slot-list_wrapper">
                <Table columns={columns} dataSource={eventList} 
                    scroll={{ x: 700 }}/>
            </div>
            <div className="p-2 d-flex justify-content-end">
                <Button type="primary" onClick={save}>Save</Button>
            </div>
        </div>
    )
}
