import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import {
  AppstoreTwoTone,
  BookOutlined, CrownTwoTone, DashboardTwoTone, FlagTwoTone,
  HeartOutlined, HomeTwoTone,
  IdcardTwoTone,
  LinkOutlined, MessageTwoTone,
  SettingTwoTone,
  SmileOutlined
} from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import {MenuDataItem} from "@umijs/route-utils";
import {getRoutes} from "@/services/login/api";
import {Button, Modal, notification} from "antd";
import cookie from "react-cookies";
import React from "react";

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * 全局数据共享
 * 其他部位通过 useModel('@@initialState') 可以拿到这个数据
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  isComplete?: boolean;
  isLogin?: boolean;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  menuData?: MenuDataItem[];
  permissions?: string[];
  messageCount?: string;
  applicationCount?: string;
}> {
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    return {
      isComplete: true,
      settings: defaultSettings,
    };
  }
  return {
    isComplete: true,
    settings: defaultSettings,
  };
}


// 检查用户权限
const checkPermissions = (permissions: string[]) => {
  if (/admin/.test(location.pathname)){
    // 管理员访问页面
    return !!permissions?.includes("admin");
}else {
    // 管理员无法访问一般页面
    return !permissions?.includes("admin");
  }
}



// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const showModal = () => {
    setInitialState({
      ...initialState,
      isComplete: false,
    })
  };





  const handleOk = () => {
    setInitialState({
      ...initialState,
      isComplete: true,
    })
    history.push("/accountsettings")
  };

  const IconMap = {
    smile: <SmileOutlined />,
    heart: <HeartOutlined />,
    my: <IdcardTwoTone />,
    settings: <SettingTwoTone />,
    admin: <CrownTwoTone />,
    club: <AppstoreTwoTone />,
    dashboard: <DashboardTwoTone />,
    activity: <FlagTwoTone />,
    home: <HomeTwoTone />,
  };
  const loopMenuItem = (menus: any[]): MenuDataItem[] =>
    menus.map(({ icon, routes, ...item }) => ({
      ...item,
      icon: icon && IconMap[icon as string],
      children: routes && loopMenuItem(routes),
    }));

  async function getMenus(){
    const queryParams = new URLSearchParams(location.search)
    let value: any;
    if (queryParams.get("token") != null){
      value = queryParams.get("token")
    }else {
      value = cookie.load("Ribo_token");
    }
    const menus = await getRoutes(value);
    return loopMenuItem(menus.data);
  }
  return {
    //菜单
    menu: {
      request: async () => getMenus(),
      locale: false,
    },
    token: {

    },

    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      const queryParams = new URLSearchParams(location.search)
      const { pathname } = history.location;
      const token = queryParams.get("token")
      if (!initialState?.currentUser && location.pathname !== loginPath && token == null){
        history.replace({
          pathname: loginPath,
          search:  "redirect="+pathname+location.search,
        });
      }

      const openNotification = () => {
        notification.open({
          message: 'Your attention please',
          description:
            'You have '+initialState?.messageCount+' unread messages',
          icon: <MessageTwoTone  style={{ color: '#108ee9' }} />,
        });
      };
      if (initialState?.currentUser && !initialState?.currentUser?.name && location.pathname !== loginPath && location.pathname !== "/accountsettings") {
        showModal();
      }
      if (initialState?.messageCount){
        openNotification();
      }

      // 检查权限
      // @ts-ignore
      if (!checkPermissions(initialState?.permissions,location.pathname) && location.pathname !== "/application"){
        // 返回403
        history.replace({
          pathname: '/forbidden',
        })
      }

    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        <Link to="/~docs" key="docs">
          <BookOutlined />
        </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {

       if (initialState?.loading) return <PageLoading />;
       if (initialState?.isComplete == false) return(
         <Modal title="🤗初次见面!🤗"
                onOk={handleOk}
                open={!initialState?.isComplete}
                closable={false}
                maskClosable={false}
                okText="确定"
                cancelText=""
                footer={<Button key="submit" type="primary" onClick={handleOk}>
                  确定
                </Button>}
         >
           <p>请先完善个人信息</p>
           <p>点击确定后，将跳转到个人信息页面</p>
         </Modal>
       );
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
