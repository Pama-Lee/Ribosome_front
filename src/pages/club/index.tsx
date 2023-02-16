import {useParams} from "umi";
import {getClubInfo} from "@/services/login/api";
import {useEffect,useState} from "react";
import { history } from 'umi';
import {PageContainer, PageLoading} from "@ant-design/pro-components";

import type { MenuProps } from 'antd';
import {Menu} from 'antd';
import {HomeOutlined, ProjectOutlined, UserOutlined} from "@ant-design/icons";
import Loader from "@/pages/club/pages/loader";
import {useModel} from "@@/plugin-model/useModel";


const Index = () => {

  const {initialState}  =  useModel('@@initialState')
  const cid: {id: any} = useParams();
  // 设定等待状态
  const [state,setState] = useState<{
    querying?: boolean;
    loading: boolean;
    cidHistory?: any;
    data?: API.ClubInfo;
  }>({
    querying: false,
    loading: true,
  });
  const [current, setCurrent] = useState('index');
  const onClick: MenuProps['onClick'] = (e) => {
    //console.log('click ', e.key);
    setCurrent(e.key);
  };
  if (state.loading && !state.querying){
    const getClubInfos = () => {
      const clubInfo = getClubInfo(cid.id).then((res) => {
        setState({
          querying: false,
          loading: false,
          cidHistory: cid.id,
          data: res,
        })
      });
    }
    getClubInfos();
  }else {
    if (state.cidHistory !== cid.id){
      setState({
        loading: true,
        cidHistory: cid.id,
      })
    }
  }


  const items: MenuProps['items'] = (state.data?.president == initialState?.currentUser?.uid) ?
    [
      {
        label: '主页',
        key: 'index',
        icon: <HomeOutlined/>
      },
      {
        label: '社团成员',
        key: 'user',
        icon: <UserOutlined/>,
      }, {
      label: '社团活动',
      key: 'activity',
      icon: <ProjectOutlined/>,
    },
      {
        label: '社团管理',
        key: 'manager',
        icon: <ProjectOutlined/>,
      }
    ]:
    [
      {
        label: '主页',
        key: 'index',
        icon: <HomeOutlined/>
      },
      {
        label: '社团成员',
        key: 'user',
        icon: <UserOutlined/>,
      }, {
      label: '社团活动',
      key: 'activity',
      icon: <ProjectOutlined/>,
    },
    ]


  if (state.loading) {
return <PageLoading />
  }
  return(
    <PageContainer>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme="light" />
      <Loader name={current} clubData={state.data}/>
    </PageContainer>
  )
}

export default Index;
