export default [

  {
    path: '/application',
    component: './Application',
    name: 'application',
  },
  {
    path: '/club',
    routes: [
      {
        path: '/club/club_Index',
      },
      {
        path: '/club/list',
        component: './club/ClubList',
        routes: [],
      },
      {
        path: '/club/detail/:id',
        component: './club',
        icon: 'team',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    routes: [
      {
        path: '/admin/club-manager',
        name: 'club-manager',
        icon: 'smile',
        component: './admin/ClubManager',
      },{
        path: '/admin/activity-manager',
        name: 'activity-manager',
        icon: 'smile',
        component: './admin/ActivityManager',
      },
      {
        name: '分析页',
        icon: 'smile',
        path: '/admin/dashboard',
        component: './admin/DashboardAnalysis',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: '个人中心',
    icon: 'smile',
    path: '/accountcenter',
    component: './AccountCenter',
  },
  {
    name: '个人设置',
    icon: 'smile',
    path: '/accountsettings',
    component: './AccountSettings',
  },
  {
    name: '403',
    icon: 'smile',
    path: '/forbidden',
    component: './Forbidden',
  },
  {
    component: './404',
  },
];
