import { Alert, Badge, BadgeProps, Button, Calendar, message, Modal } from "antd";
import moment, { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../core/apiService";
import { DATE_FORMAT } from "../../core/constants/common";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { isMobileDevice } from "../../core/utils";
import "./UpcomingSlots.scss";
import { ViewAndBookSlot } from "./ViewAndBookSlot";

export default function UpcomingSlots() {
    const [slots, setSlots] = useState<any[]|undefined>(undefined);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [selectedDate, setSelectedDate] = useState<Moment|undefined>(undefined);
    const [upcomingBookings, setUpcomingBooking] = useState([]);
    const isMobile = isMobileDevice();

    const getListData = (value: Moment) => {
        let listData;
        const currentDay = (+(value.format("d"))+1).toString();
        const currentDaySlotData = (slots && Array.isArray(slots)) ? (slots as any[])?.find(s => s.day === currentDay) : null;
        if (currentDaySlotData?.slots && Array.isArray(currentDaySlotData?.slots) && value.diff(moment().subtract(1, 'day')) >= 0) {
            listData = currentDaySlotData?.slots.map((slot: any) => {
                return {
                    type: "success",
                    content: slot.name,
                    data: slot
                };
            });
        }
        return listData || [];
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item: any, i: number) => (
                    <li key={`${item.content}_${i+1}`}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const onDateSelect = (date: Moment) => {
        if (date.diff(moment().subtract(1, 'day')) >= 0) {
            const selectedDay = (+date.format("d")+1)+"";
            setSelectedDate(date);
            const slot = slots?.find((s) => s.day === selectedDay)?.slots;
            setSelectedSlot(slot);
        }
    };

    const getAllSlots = () => {
        toggleSpinner(true);
        getRequest({ url: "/slot/list" })
        .then((res) => {
            toggleSpinner(false);
            setSlots(res.data);
        })
        .catch(() => {
            toggleSpinner(false);
            message.error("Couldn't fetch time slots");
        });
    };

    const toggleBooking = () => {
        setSelectedSlot(null);
    };

    const getUpcomingBookings = () => {
        toggleSpinner(true);
        getRequest({ url: "/notifications/latest" })
        .then((res) => {
            toggleSpinner(false);
            setUpcomingBooking(res.data.map((booking: any) => ({ ...booking, bookingDate: moment.utc(booking.bookingDate).format(DATE_FORMAT) })));
        })
        .catch(() => {
            message.error("Couldn't fetch upcoming bookings");
            toggleSpinner(false);
        });
    };

    useEffect(() => {
        getAllSlots();
        getUpcomingBookings();
    }, []);

    const viewMore = () => {
        Modal.info({
            title: 'Upcoming SLots',
            content: (
              <div>
                {
                    upcomingBookings.map((booking: any, i) => (
                        <React.Fragment key={i}>
                            <div className="small-slot grey" >
                                <div className="event">{booking.eventName}</div>
                                <div className={`status badge ${booking?.status?.toLowerCase()||'pending'}`}>{booking.status}</div>
                                <div className="date">
                                    {booking.bookingDate} <span className="badge badge-primary">{booking.slotStartTme}</span> to <span className="badge badge-primary">{booking.slotEndTme}</span>
                                </div>
                            </div>
                        </React.Fragment>
                    ))
                }
              </div>
            )
        });
    };

    return (
        <PageWrapper title="Upcoming Slots" subTitle={!isMobile ? "View and Request Slot" : ""}>
            <Alert
                message="Informational Notes"
                description="Click on the dates to view all the events and book events"
                type="warning"
                showIcon
                className="mb-3"
                closable
            />
            {
                upcomingBookings?.length &&
                <>
                    <h6>Upcoming Classes</h6>
                    <div className="d-flex align-items-center small-slot-wrapper">
                        {
                            upcomingBookings.map((booking: any, i) => (
                                <React.Fragment key={i}>
                                    { i < 2 &&
                                        <div className="small-slot" >
                                            <div className="event">{booking.eventName}</div>
                                            <div className={`status badge ${booking?.status?.toLowerCase()||'pending'}`}>{booking.status}</div>
                                            <div className="date">
                                                {booking.bookingDate} <span className="badge badge-primary">{booking.slotStartTme}</span> to <span className="badge badge-primary">{booking.slotEndTme}</span>
                                            </div>
                                        </div>
                                    }
                                </React.Fragment>
                            ))
                        }
                        {
                            upcomingBookings.length > 2 &&
                            <Button type="primary" ghost size="small" onClick={viewMore} >View More</Button>
                        }
                    </div>
                </>
            }
            <h6>Book Your slot</h6>
            {
                slots && <div className="Upcoming-slot__wrapper"><Calendar
                    dateCellRender={dateCellRender}
                    onSelect={onDateSelect}
                /></div>
            }
            <ViewAndBookSlot isOpen={!!selectedSlot} slots={selectedSlot as any} toggleModal={toggleBooking} bookingDate={selectedDate}/>
        </PageWrapper>
    );
}
