import React, { SyntheticEvent, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { Drawer, Layout, Menu, MenuProps, Dropdown, Space } from 'antd';
import { MenuItems } from "./menu";
import { UserType } from "../constants/common";
import LogoWhite from "../../assets/images/logo.png";
import UserWhite from "../../assets/images/user.png";
import Ham from "../../assets/images/ham.png";
import { isMobileDevice } from "../utils";
import "./Layout.scss";

const { Content, Sider } = Layout;

const MobileHeader = ({openDrawer}: any) => {

    const onDrawerOpen = (e: SyntheticEvent) => {
        e.preventDefault();
        openDrawer();
    };

    const menu = (
        <Menu
          items={[
            {
              label: "Change Password",
              key: '0',
            },
            {
              label: "Logout",
              key: '1',
            }
          ]}
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
                <a href="/app/students">
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

const MenuList = ({ items, hideLogo, onClick }: any) => {

    const navigation = useNavigate();

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
                    <a href="/app/students">
                        <img src={LogoWhite} alt="Logo" />
                    </a>
                </div>
            }
            <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} onClick={onMenuClick}/>
            <ul className="ant-menu ant-menu-inline ant-menu-root Settings__menu">
                <li className="ant-menu-item ant-menu-item-only-child Settings__item">
                    <span className="ant-menu-title-content">Change Password</span>
                </li>
                <li className="ant-menu-item ant-menu-item-only-child Settings__item">
                    <span className="ant-menu-title-content">Logout</span>
                </li>
            </ul>
        </>
    );
};

export function LayoutWrapper() {
    const currentUserType: UserType = UserType.Admin;
    const [collapsed] = useState(false);
    const [isMobileDrawerOpen, setIsOpenDrawer] = useState(false);
    const isMobile = isMobileDevice();
    const fullWidth = window.innerWidth;

    const items: MenuProps['items'] = [...MenuItems]
        .filter(menu => menu.access.includes(currentUserType))
        .map((menu, index) => {
            return {
                key: String(index + 1),
                icon: null,
                label: menu.label,
                url :menu.url
            };
        });

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
                        width="250"
                        theme="light"
                    >
                        <MenuList items={items} />
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
                        <MenuList items={items} hideLogo onClick={() => setIsOpenDrawer(false)}/>
                    </Drawer>
                }
                <Layout className="site-layout" style={{ marginLeft: !isMobile ? (!collapsed ? 250 : 80) : 0 }}>
                    <Content style={!isMobile ? { margin: '24px 16px 0', overflow: 'initial' } : {  margin: '24px 16px 0', marginTop: '85px', overflow: 'initial' }}>
                        {
                            isMobile && <MobileHeader openDrawer={() => setIsOpenDrawer(true)}/>
                        }
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}
