import {useState} from "react";
import {ModalForm, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, Cascader, Input, message, Modal, Tag} from "antd";
import FormItem from "antd/es/form/FormItem";
import {getClubAllAction, getClubRole, newClubRole} from "@/services/login/api";
import {Option} from "rc-util/es/Children/toArray";
import {useParams} from "umi";
import cookie from "react-cookies";

const Role = () => {
  const clubID: any = useParams();
  const [state, setState] = useState<{
    loading: boolean;
    openDrawer: boolean;
    openPermission: boolean;
    currentRow?: any;
    data?: any;
    options?: Option[];
  }>({
    openDrawer: false,
    openPermission: false,
    loading: true,
});
  const form: any = null;

  const setDrawerVisible = (visible: boolean) => {
    getClubAllAction().then((res) => {
      setState({
        ...state,
        openDrawer: visible,
        options: res,
      })
    });
  }
  const setPermissionVisible = (visible: boolean) => {
    setState({
      ...state,
      openPermission: visible,
    })
  }

  type TableItem = {
    rid: string,
    name: string,
    time: string,
  }
  const columns: ProColumns<TableItem>[] = [
    {
      title: '角色ID',
      dataIndex: 'rid',
    },{
      title: '角色名称',
      dataIndex: 'role',
    },{
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    render: (_: any, record: any) =>{
      return(
        <>
          <Button type={"primary"} onClick={
            () => {
              setState({
                ...state,
                currentRow: record,
                openPermission: true,
              })
            }
          }>查看权限</Button>
          <Button color={'red'}>删除</Button>
        </>
      )
    }
    }
  ]

  if (state.loading){
    getClubRole({token: cookie.load("Ribo_token"), cid: clubID.id}).then((res) => {
      setState({
        ...state,
        loading: false,
        data: res,
      })
    });
  }

  return (
    <div>
      <Modal
        title="权限列表"
        open={state.openPermission}
        onOk={() => {
          setPermissionVisible(false);
        }
        }
        onCancel={() => {
          setPermissionVisible(false);
        }}
      >{
        state.currentRow?.permission.map((item: any) =>{
          return(
            <Tag color={'geekblue'}>{item}</Tag>
          )
        })
      }
      </Modal>

      <ModalForm
        visible={state.openDrawer}
        form={form}
        onVisibleChange={setDrawerVisible}
        title="创建角色"
        onFinish={async (values) => {
          const data = {
            cid: clubID.id,
            role: values.name,
            action: JSON.stringify(values.permission),
            token: cookie.load("Ribo_token")
          };
          const back = await newClubRole(data);
          if (back.status === 200 || back.status === '200' || back.message === 'success'){
            // 清空表单
            message.success("创建成功");
            setState({
              ...state,
              openDrawer: false,
            })
            form.resetFields();
          }
        }}
      >
        <FormItem>
          <Button type="primary" htmlType="reset">Reset</Button>
        </FormItem>
        <FormItem
          label="角色名称"
          name="name"
          rules={[
            {
              required: true,
              message: '角色名称为必填项',
            },
          ]}
        >
          <Input placeholder="请输入角色名称" />
        </FormItem>
        <FormItem
          label="角色权限"
          name="permission"
        >
          <Cascader
            placeholder="Please select"
            style={{ width: '100%' }}
            options={state.options || []}
            multiple
            maxTagCount="responsive"
          />
        </FormItem>
      </ModalForm>

      <ProTable<TableItem>
        columns={columns}
        dataSource={state.data || []}
        rowKey="rid"
        search={false}
        pagination={false}
        dateFormatter="string"
        headerTitle="角色列表"
        toolbar={{
          actions: [
            <Button key="3" onClick={() => {setDrawerVisible(true)}} type="primary">创建</Button>
          ],
        }
        }
      />
    </div>
  );
}

export default Role;
