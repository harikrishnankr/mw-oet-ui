import { Button, message } from "antd";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { postRequest } from "../../core/apiService";
import { DATE_FORMAT } from "../../core/constants/common";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { isMobileDevice } from "../../core/utils";
import "./Notifications.scss";
import { notificationEmitter } from "../../core/layout/Layout";

export function Notifications() {
    const cursor = useRef(null);
    const isMobile = isMobileDevice();
    const [notifications, setNotifications] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const getNotifications = () => {
        const payload = {
            itemsPerPage: 10,
            cursor: cursor.current
        };
        toggleSpinner(true);
        return postRequest({ url: "/notifications/list", payload })
        .then((res) => {
            toggleSpinner(false);
            cursor.current = res.data.cursor;
            setNotifications((previousNotifications) => [...previousNotifications, ...res.data.notifications.map((notification: any) => {
                notification.bookingDate = moment(notification.bookingDate).format(DATE_FORMAT);

                return notification;
            })] as any);
            setHasMore(res.data.hasMoreNotifications);
        })
        .catch(() => {
            toggleSpinner(false);
        });
    };

    useEffect(() => {
        getNotifications();
        notificationEmitter.on("onPush", (payload) => {
            console.log("In Not::::", payload);
            const notification: any = JSON.parse(payload.data.notificationData);
            notification.bookingDate = moment(notification.bookingDate).format(DATE_FORMAT);
            setNotifications((previousNotifications: any[]) => [notification, ...previousNotifications] as any);
        })
    }, []);

    const refresh = () => {
        cursor.current = null;
        setHasMore(false);
        setNotifications([]);
        getNotifications();
    };

    const updateNotificationStatus = (isAccept: boolean, notification: any) => {
        postRequest({ url: '/notifications/update-status', payload: { notificationId: notification._id, isAccept } })
        .then(() => {
            setNotifications((previousNotifications: any[]) => {
                return previousNotifications.map((innerNot: any) => {
                    if (innerNot._id === notification._id) {
                        return {
                            ...innerNot,
                            status: isAccept ? "APPROVED": "REJECTED"
                        };
                    }

                    return innerNot;
                }) as any;
            });
            message.success(`Successfully ${isAccept ? 'Accepted': 'Rejected'} the notification`);
        })
        .catch((err) => {
            message.error(err?.message||"Couldn't update notification status");
        })
    };

    return (
        <PageWrapper title="Notifications" subTitle={!isMobile ? "View and Accept Notifications" : ""} actions={[
            <Button type="primary" onClick={refresh} ghost key="1">Refresh</Button>
        ]}>
            <div className="Notifications__wrapper">
                <ul>
                    {notifications.map((item: any) => (
                        <li key={item._id} className={`Notification item ${item?.status?.toLowerCase()||'pending'}`}>
                            <div className={`status ${item?.status?.toLowerCase()||'pending'}`}>
                                <div></div>
                            </div>
                            <div className="details">
                                <div className="line1">
                                    <div className="from">
                                        <div className="truncate">{item.studentDetails.name}</div>
                                        <div className="ml-1 mr-1">-</div>
                                        <div className="truncate">{item.eventName}</div>
                                    </div>
                                    <div className="time">
                                        {item.bookingDate} {item.slotStartTme}-{item.slotEndTme}
                                    </div>
                                </div>
                                <div className="d-flex mt-3">
                                    {
                                        item.status === 'PENDING' && <>
                                            <Button type="primary" danger className="mr-3"
                                                size="small" onClick={() => updateNotificationStatus(false, item)}>Reject</Button>
                                            <Button type="primary" size="small" ghost
                                                onClick={() => updateNotificationStatus(true, item)}>Accept</Button>
                                        </>
                                    }
                                    {
                                        item.status !== 'PENDING' ? item.status : null
                                    }
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {
                    hasMore &&
                    <div className="d-flex justify-content-center mb-3">
                        <Button type="primary" ghost onClick={getNotifications}>Load More...</Button>
                    </div>
                }
            </div>
        </PageWrapper>
    );
}
