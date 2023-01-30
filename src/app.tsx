import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from 'umi';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import {MenuDataItem} from "@umijs/route-utils";
import {getRoutes} from "@/services/login/api";
import {IconMap} from "antd/lib/result";

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
  isLogin?: boolean;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  menuData: MenuDataItem[]
}> {
  const menuDatas = await getRoutes();
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    return {
      menuData: menuDatas,
      settings: defaultSettings,
    };
  }
  return {
    menuData: menuDatas,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    //菜单
    menu: {
      request: async () => {
        const menus = await getRoutes();
        return menus.data;
      },
      locale: false,
    },


    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
      const queryParams = new URLSearchParams(location.search)
      const token = queryParams.get("token")
      if (!initialState?.currentUser && location.pathname !== loginPath && token == null){
        history.push(loginPath);
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
      // if (initialState?.loading) return <PageLoading />;
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
