import React, { SyntheticEvent, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Drawer, Layout, Menu, MenuProps, Dropdown, Space } from 'antd';
import { MenuItems } from "./menu";
import { APP_BASE_ROUTE, STAFF_BASE_ROUTE, STUDENT_BASE_ROUTE, UserType } from "../constants/common";
import LogoWhite from "../../assets/images/logo.png";
import UserWhite from "../../assets/images/user.png";
import Ham from "../../assets/images/ham.png";
import { isMobileDevice } from "../utils";
import "./Layout.scss";
import { getUserType, logout } from "../services";
import { ChangePassword } from "../../pages/auth/ChangePassword";
import { requestFirebasePermission } from '../firebase';
import { getMessaging, onMessage } from "firebase/messaging";
import { postRequest } from "../apiService";
import { EventEmitter } from "../eventEmitter";

export const notificationEmitter = new EventEmitter();

export const pushNotification = (data: any) => {
    notificationEmitter.emit("onPush", data);
};

const { Content, Sider } = Layout;

const MobileHeader = ({openDrawer, onActionClick}: any) => {

    const onDrawerOpen = (e: SyntheticEvent) => {
        e.preventDefault();
        openDrawer();
    };

    const menu = (
        <Menu
          items={[
            {
              label: "Change Password",
              key: 'CHANGE_PASSWORD',
            },
            {
              label: "Logout",
              key: 'LOGOUT',
            }
          ]}
          onClick={(value) => onActionClick(value.key)}
        />
    );

    return (
        <div className="Mobile__Header--wrapper">
            <div className="toggle__menu icon">
                <a href="/#/" onClick={onDrawerOpen}>
                    <img src={Ham} alt="Ham"/>
                </a>
            </div>
            <div className="logo">
                <a href={APP_BASE_ROUTE}>
                    <img src={LogoWhite} alt="Logo"/>
                </a>
            </div>
            <div className="user icon">
                <Dropdown overlay={menu} trigger={['click']}>
                    <a href="/#/" onClick={e => e.preventDefault()}>
                        <Space>
                            <img src={UserWhite} alt="User"/>
                        </Space>
                    </a>
                </Dropdown>
            </div>
        </div>
    );
};

const MenuList = ({ items, hideLogo, onClick, onActionClick }: any) => {
    const currentUserType: UserType = getUserType();
    const navigation = useNavigate();
    const location = useLocation();
    const [selected, setSelected] = useState<string[]>([]);

    useEffect(() => {
        const selectedRoute = items.find((i: any) => location.pathname.includes(i.url) &&  i.access.includes(currentUserType));
        if (selectedRoute || location.pathname.includes("app/study-materials/video/")) {
            selectedRoute?.key && setSelected([selectedRoute?.key]);
        } else {
            const baseRoute = currentUserType === UserType.Admin ? APP_BASE_ROUTE : (currentUserType === UserType.Staff ? STAFF_BASE_ROUTE : STUDENT_BASE_ROUTE);
            navigation(baseRoute);
        }
    }, [location]);

    const onMenuClick = ({ key }: { key: string }) => {
        const url = items[+key - 1]?.url;
        navigation(url);
        onClick && onClick();
    };
    
    return (
        <>
            {
                !hideLogo &&
                <div className="logo">
                    <a href={APP_BASE_ROUTE}>
                        <img src={LogoWhite} alt="Logo" />
                    </a>
                </div>
            }
            <Menu theme="light" mode="inline" selectedKeys={selected} items={items} onClick={onMenuClick}/>
            <ul className="ant-menu ant-menu-inline ant-menu-root Settings__menu">
                <li className="ant-menu-item ant-menu-item-only-child Settings__item">
                    <span className="ant-menu-title-content" onClick={() => onActionClick("CHANGE_PASSWORD")}>Change Password</span>
                </li>
                <li className="ant-menu-item ant-menu-item-only-child Settings__item">
                    <span className="ant-menu-title-content" onClick={() => onActionClick("LOGOUT")}>Logout</span>
                </li>
            </ul>
        </>
    );
};

export function LayoutWrapper() {
    const currentUserType: UserType = getUserType();
    const [isMobileDrawerOpen, setIsOpenDrawer] = useState(false);
    const [isChangePasswordOpen, toggleChangePassword] = useState<boolean>(false);
    const isMobile = isMobileDevice();
    const navigation = useNavigate();
    const fullWidth = window.innerWidth;

    const items: MenuProps['items'] = [...MenuItems]
        .filter(menu => menu.access.includes(currentUserType))
        .map((menu, index) => {
            return {
                key: String(index + 1),
                icon: null,
                label: menu.label,
                url :menu.url,
                access: menu.access
            };
        });
    
    const onActionClick = (type: string) => {
        switch (type) {
            case "LOGOUT":
                logout(navigation);
                break;
            case "CHANGE_PASSWORD":
                setIsOpenDrawer(false);
                toggleModal();
                break;
        }
    };

    const toggleModal = () => {
        toggleChangePassword((isOpen) => !isOpen);
    };

    useEffect(() => {
        if (currentUserType === UserType.Admin) {
            requestFirebasePermission((token: string) => {
                // console.log("Layout ::::: "+ token);
                postRequest({ url: "/notifications/token/register", payload: { token } });
            });
            const messaging = getMessaging();
            onMessage(messaging, (payload) => {
                // console.log('Message received. Notification', payload);
                pushNotification(payload);
            });
            const bc = new BroadcastChannel('test_channel');
            bc.onmessage = event => {
                // console.log("Broadcast channel Notifications", event.data);
                pushNotification(event.data);
            }
        }
    }, []);

    return (
        <div className="Layout__wrapper">
            <Layout hasSider={!isMobile}>
                {
                    !isMobile &&
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0
                        }}
                        width={ !isMobile && window.innerWidth <= 991 ? "230" : "250"}
                        theme="light"
                    >
                        <MenuList items={items} onActionClick={onActionClick} />
                    </Sider>
                }
                {
                    isMobile && 
                    <Drawer
                        // title={`${size} Drawer`}
                        placement="left"
                        width={fullWidth}
                        visible={isMobileDrawerOpen}
                        onClose={() => setIsOpenDrawer(false)}
                    >
                        <MenuList items={items} hideLogo onClick={() => setIsOpenDrawer(false)} onActionClick={onActionClick}/>
                    </Drawer>
                }
                <Layout className="site-layout" style={{ marginLeft: !isMobile ? (window.innerWidth <= 991 ? 230 : 250) : 0 }}>
                    <Content style={!isMobile ? { margin: '0px 16px 0', overflow: 'initial' } : {  margin: '0px 16px 0', marginTop: '85px', overflow: 'initial' }}>
                        {
                            isMobile && <MobileHeader openDrawer={() => setIsOpenDrawer(true)} onActionClick={onActionClick}/>
                        }
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
            <ChangePassword isOpen={isChangePasswordOpen} toggleModal={toggleModal}/>
        </div>
    );
}
