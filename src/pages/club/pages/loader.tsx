import React, {useState, useRef} from 'react'; // 这里引入组件是为了在这里使用其它组件
import type { ProColumns } from '@ant-design/pro-components';
import {ActionType, PageLoading, ProTable} from '@ant-design/pro-components';
import { Card, Col, Row, Image, Alert} from 'antd';
import styles from './loader.less';
import {getClubActivity, getClubAnnouncement, getClubUser} from "@/services/login/api";
import Manager from "@/pages/club/Manager";
import {useParams} from "umi";
import cookie from "react-cookies";

let params: any;

const positionEnv = {
  0: '社长',
  1: '副社长',
  2: '成员',
};

let tableListDataSource: API.ClubUser[];
let activityListDataSource: API.ClubActivity[];

const columns: ProColumns<API.ClubUser>[] = [
  {
    title: '姓名',
    width: 80,
    dataIndex: 'username',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '职位',
    width: 80,
    dataIndex: 'roleName',
    valueEnum: positionEnv
  },
  {
    title: '加入时间',
    width: 100,
    dataIndex: 'joinTime',
  },
];

const activityColumns: ProColumns<API.ClubActivity>[] = [
  {
    title: '活动名称',
    width: 80,
    dataIndex: 'activity_name',
  },{
    title: '活动时间',
    width: 80,
    dataIndex: 'activity_time',
  },{
    title: '活动地点',
    width: 80,
    dataIndex: 'activity_place',
  },{
    title: '活动状态',
    width: 80,
    dataIndex: 'activity_status',
  }
]





function Loader(param: any) {
  params = param;
  const clubId: any = useParams();
  const [loading,setLoading] = useState(true);
  const actionRef = useRef<ActionType>();
  const [data,setData] = useState<{
    announcement?: any
  }>({

  });
  if (!data?.announcement){
    getClubAnnouncement({
      cid: clubId.id,
      token: cookie.load("Ribo_token")
    }).then((res) => {
      if (res.code === 200 || res.code === '200' || res.message === 'success' || res.message === 'Success'){
        setData({
          announcement: res.data
        })
      }else {
        setData({
          announcement: {
            title: 'Unable to get announcement',
            content: 'Unable to get announcement'
          }
        })
      }

    })
  }


  function table(){
    getClubUser({
      cid: clubId.id,
      token: cookie.load("Ribo_token")
    }).then((res) => {
      // @ts-ignore
      tableListDataSource = res;
      setLoading(false);
    })
    if (loading) {
      return <PageLoading />
    }else {
      return (
        <ProTable<API.ClubUser>
          dataSource={tableListDataSource}
          rowKey="key"
          pagination={{
            showQuickJumper: true,
          }}
          request={(params, sorter, filter) => {
            // 表单搜索项会从 params 传入，传递给后端接口。
            return Promise.resolve({
              data: tableListDataSource,
              success: true,
            });
          }}
          search={{
            filterType: 'light',
          }}
          columns={columns}
          dateFormatter="string"
          headerTitle="成员列表"
        />
      );
    }


  }

  function index(){
    return (
      <div>
        <Row>
          <Col lg={17} md={24} xs={24}>
            <Card title={param.clubData.name} bordered={true}>
              <Alert message="在线人数:10" type="success" />
            </Card>
            <Card>
              <h2>Club Announcement</h2>
              <p>Title:{data?.announcement?.title || 'null'}</p>
              <p>Content: {data?.announcement?.content || 'null'}</p>
            </Card>
          </Col>
          <Col lg={7} md={24} xs={24}>
            <Card bordered={false} bodyStyle={{textAlign: "center"}} >
              <Image
                className={styles.logo}
                src="https://rootjam.pamalee.cn/assets/logo.c0ec237b.png"
                fallback="data:image/png;base64,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"
              />
              <h1 className={styles.clubName}>{param.clubData.name}</h1>
              <h2>{param.clubData.description}</h2>
              <Alert message={"社长:"+param.clubData.presidentName} type="info" />
            </Card>
          </Col>
        </Row>
      </div>

    );
  }

  function activity() {
    getClubActivity(params.clubData.cid).then((res) => {
      // @ts-ignore
      activityListDataSource = res;
      setLoading(false)
      actionRef.current?.reload();
    });
    if (loading) {
      return <PageLoading />
    }
    return (
      <ProTable<API.ClubActivity>
        dataSource={activityListDataSource}
        actionRef={actionRef}
        rowKey="key"
        pagination={{
          showQuickJumper: true,
        }}
        request={(params, sorter, filter) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          return Promise.resolve({
            data: activityListDataSource,
            success: true,
          });
        }}
        search={{
          filterType: 'light',
        }}
        columns={activityColumns}
        dateFormatter="string"
        headerTitle="成员列表"
      />
    )

  }


  function manager() {
    if (loading) {
      setLoading(false)
      return <PageLoading />
    }
    return (
      <div>
        <Manager/>
      </div>
    )
  }




  switch (param.name) {
    case 'user':
      return table();
      case 'index':
        return index();
        case 'activity':
          return activity();
          case 'manager':
            return manager();
    default:
      return index();

  }
}

export default Loader;
