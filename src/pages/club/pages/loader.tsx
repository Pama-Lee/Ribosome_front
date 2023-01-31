import React, {Suspense, Component, useState} from 'react'; // 这里引入组件是为了在这里使用其它组件
import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import {PageLoading, ProTable, TableDropdown} from '@ant-design/pro-components';
import {Button, Card, Col, Row, Image, Alert} from 'antd';
import styles from './loader.less';
import {getClubUser} from "@/services/login/api";


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
    dataIndex: 'role',
    align: 'right',
    valueEnum: positionEnv
  },
  {
    title: '加入时间',
    width: 100,
    dataIndex: 'join_time',
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


function table(state: any){
  const [loading, setLoading]  = state;
  getClubUser("1").then((res) => {
    // @ts-ignore
    tableListDataSource = res;
    console.log(res)
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
          console.log(params, sorter, filter);
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

function index(param: any){
  //console.log(param)
  return (
    <div>
      <Row>
        <Col xs={0} md={12} lg={18}>
          <Card title={param.clubData.club_name} bordered={true}>
            <Alert message="在线人数:10" type="success" />

          </Card>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Card bordered={false} bodyStyle={{textAlign: "center"}} >
            <Image
              className={styles.logo}
              src="https://rootjam.pamalee.cn/assets/logo.c0ec237b.png"
              fallback="data:image/png;base64,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"
            />
            <h1 className={styles.clubName}>{param.clubData.club_name}</h1>
            <h2>{param.clubData.club_description}</h2>
            <Alert message={"社长:"+param.clubData.club_president} type="info" />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={0}>
          <Card title={param.clubData.club_name} bordered={true}>
            <Alert message="在线人数:10" type="success" />

          </Card>
        </Col>
      </Row>
    </div>

  );
}

function activity(state: any) {
  const [loading,setLoading] = state;


  if (loading) {
    return <PageLoading />
  }
  return (
    <ProTable<API.ClubActivity>
      dataSource={activityListDataSource}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      request={(params, sorter, filter) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        console.log(params, sorter, filter);
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



function Loader(param: any) {
  const [loading,setLoading] = useState(true);
  switch (param.name) {
    case 'user':
      return table([loading,setLoading]);
      case 'index':
        return index(param);
        case 'activity':
          return activity([loading,setLoading]);
    default:
      return index(param);

  }
}

export default Loader;
