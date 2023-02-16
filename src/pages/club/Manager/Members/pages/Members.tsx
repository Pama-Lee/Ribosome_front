import {ProColumns, ProTable} from "@ant-design/pro-components";
import {DrawerForm} from "@ant-design/pro-form/es";
import {useState} from "react";
import FormItem from "antd/es/form/FormItem";
import {Descriptions, Drawer, message, Select} from "antd";
import {getClubRole, getClubUser, updateClubUserRole} from "@/services/login/api";
import {useParams} from "umi";
import cookie from "react-cookies";

const MembersSub = () => {

  function getWindowSize() {
    const {innerWidth, innerHeight} = window;
    return {innerWidth, innerHeight};
  }

  const param: any = useParams();

  const [data, setData] = useState<{
    loading: boolean;
    drawerVisible: boolean;
    currentRow?: any;
    roleOptions?: any;
    openView?: boolean;
    data?: any;
    value?: any;
    windowSize?: any;
    userListData?: any;
  }>({
    loading: true,
    drawerVisible: false,
    windowSize: getWindowSize(),
  });



  if (data.loading) {
getClubUser({
      cid: param.id,
      token: cookie.load("Ribo_token"),
}).then((res) => {
  setData({
    ...data,
    loading: false,
    windowSize: getWindowSize(),
    userListData: res,
  })
});


  }

  const setDrawerVisible = (visible: boolean) => {
    setData({
      ...data,
      drawerVisible: visible,
    })
    }

    const openDrawer = (row: any) => {
    getClubRole({
      cid: param.id,
      token: cookie.load("Ribo_token"),
    }).then((res) => {

      const result = res.map((item: any) => {
        return {
          label: item.role,
          value: item.rid,
        }
      });
      setData({
        ...data,
        drawerVisible: true,
        currentRow: row,
        roleOptions: result,
      })
    });
    }


  const columns: ProColumns[] = [
    {
      title: '成员ID',
      dataIndex: 'rid',
    },{
      title: '成员名称',
      dataIndex: 'username',
    },
    {
      title: '职位',
      dataIndex: 'roleName',
    },
    {
      title: '加入时间',
      dataIndex: 'joinTime',
    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a key="1" onClick={
          () => {
            setData({
              ...data,
              openView: true,
              currentRow: record,
            })
          }
        }>查看</a>,
        <a key="2" onClick={
          () => {
            openDrawer(record);
          }
        }>编辑</a>,
        <a key="3">删除</a>,
      ],
    }
  ]




  return(
    <>
      <Drawer
        width={(data.windowSize.innerWidth < 720) ? 320 : 720}
        title="查看成员"
        open={data.openView}
        onClose={() => {
          setData({
            ...data,
            openView: false,
          })
        }}
        closable={true}
        >
        <Descriptions title="成员信息" bordered>
          <Descriptions.Item label="成员ID">{data.currentRow?.rid}</Descriptions.Item>
          <Descriptions.Item label="成员名称">{data.currentRow?.username}</Descriptions.Item>
          <Descriptions.Item label="成员职位">{data.currentRow?.role}</Descriptions.Item>
          <Descriptions.Item label="加入时间">{data.currentRow?.joinTime}</Descriptions.Item>
        </Descriptions>
      </Drawer>
      <DrawerForm
        width={(data.windowSize.innerWidth < 720) ? 320 : 720}
        title="编辑成员"
        visible={data.drawerVisible}
        onVisibleChange={setDrawerVisible}
        onFinish={async (values) => {
          updateClubUserRole({
            cid: param.id,
            token: cookie.load("Ribo_token"),
            uid: data.currentRow?.uid,
            rid: values.rid,
          }).then((res) => {
            if (res.status === 200 || res.status === '200' || res.message === 'success') {
              message.success('修改成功');
              setDrawerVisible(false);
            }else {
              message.error(res.message || '修改失败')
            }
          });
        }}
      >
        <FormItem
          label="成员职位"
          name="rid"
        >
          <Select
            showSearch
            placeholder="Select a Role"
            optionFilterProp="children"
            options={data.roleOptions|| []}
          />
        </FormItem>

      </DrawerForm>
      <h1>Members</h1>
      <ProTable
        columns={columns}
        dataSource={data.userListData || []}
        rowKey={"mid"}
        search={false}
        pagination={false}
        dateFormatter="string"
        headerTitle="成员列表"
        >

      </ProTable>
      </>
  )
}

export default MembersSub;
