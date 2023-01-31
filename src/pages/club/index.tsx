import {useParams} from "umi";
import {getClubInfo} from "@/services/login/api";
import {useEffect,useState} from "react";
import { history } from 'umi';
import {PageContainer, PageLoading} from "@ant-design/pro-components";

import type { MenuProps } from 'antd';
import {Menu} from 'antd';
import {HomeOutlined, ProjectOutlined, UserOutlined} from "@ant-design/icons";
import Loader from "@/pages/club/pages/loader";
const items: MenuProps['items'] = [
  {
    label: '主页',
    key: 'index',
    icon: <HomeOutlined />
  },
  {
    label: '社团成员',
    key: 'user',
    icon: <UserOutlined />,
  },{
    label: '社团活动',
    key: 'activity',
    icon: <ProjectOutlined />,
  }
];

const Index = (props: any) => {

  // 设定等待状态
  const [loading,setLoading] = useState(true);

  const [current, setCurrent] = useState('index');

  const onClick: MenuProps['onClick'] = (e) => {
    //console.log('click ', e.key);
    setCurrent(e.key);
  };

  const [data, setData] = useState<API.ClubInfo>();
  const getClubInfos = async () => {
    const clubInfo = await getClubInfo(props.params.id);
    setData(clubInfo)
    setLoading(false)
    return clubInfo;
  }

  // @ts-ignore
  useEffect(async ()=>{
    await getClubInfos();
    history.listen(() => {
      getClubInfos();
    })
    return () => {
      setData({});
    };
  },[]);
  if (loading) {
return <PageLoading />
  }
  return(
    <PageContainer>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} theme="light" />
      <Loader name={current} clubData={data}/>
    </PageContainer>
  )
}

export default (props: any)=>(
   <Index
    {...props}
    params={useParams()}/>
);
