import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {ModalForm, ProTable, TableDropdown} from '@ant-design/pro-components';
import { Button, Drawer, Dropdown, Form, message, Tag} from 'antd';
import React, { useRef, useState } from 'react';
import request from 'umi-request';
import cookie from "react-cookies";
import {ProFormText} from "@ant-design/pro-form";
import {newClub, updateClub} from "@/services/login/api";
import UpdateForm from "@/pages/admin/ClubManager/ClubTable/UpdateForm";
import {FormValueType} from "@/pages/admin/ActivityManager/components/UpdateForm";

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<API.RuleListItem>;
};



export default () => {

  const [state, setState] = useState<{
    open?: boolean;
    drawer?: boolean;
    updateModalVisible?: boolean;
    currentRow?: any;
  }>({
    open: false,
    drawer: false,
    updateModalVisible: false,
    currentRow: undefined
  });
  const setOpen = (open: boolean) => {
    setState({
      ...state,
      open,
    });
  }
  const handleUpdateModalVisible = (updateModalVisible: boolean) => {
    setState({
      ...state,
      updateModalVisible,
    });
  }

  const setCurrentRow = (currentRow: any) => {
    setState({
      ...state,
      currentRow,
    });
  }

  const setDrawer = (drawer: boolean) => {
    setState({
      ...state,
      drawer,
    });
  }
  const onDrawerClose = () => {
    setDrawer(false);
  }
  const [form] = Form.useForm<{ name: string; company: string }>();
  const actionRef = useRef<ActionType>();

  const getColor = (status: any) => {
    if (status == 0){
      return "red";
    }
    else if (status == 1){
      return "green";
    }
    return "blue";
  }

  type GithubIssueItem = {
    url: string;
    id: number;
    number: number;
    title: string;
    labels: {
      name: string;
      color: string;
    }[];
    state: string;
    comments: number;
    created_at: string;
    updated_at: string;
    closed_at?: string;
  };
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: 'Club Name',
      dataIndex: 'name',
      copyable: true,
      ellipsis: true,
      tip: 'If you want to change the name, please contact the administrator',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'This field is required',
          },
        ],
      },
    },
    {
      disable: true,
      title: 'Status',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      render: (text, record, _, action) => [

        <Tag color={getColor(record.status)}>{text}</Tag>
      ],
      valueEnum: {
        0: {
          text: 'Closed',
          status: 0,
        },
        1: {
          text: 'Running',
          status: '1',
        },
        2: {
          text: 'Processing',
          status: '2',
        },
      },
    },
    {
      disable: true,
      title: 'Club Members',
      dataIndex: 'number',
      search: false,
    },
    {
      title: 'Create Time',
      key: 'creatTime',
      dataIndex: 'time',
      valueType: 'date',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: 'Create Time',
      dataIndex: 'time',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: 'Options',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log("from click:");
            console.log(record);
            setState({
              ...state,
              updateModalVisible: true,
              currentRow: record,
            })
          }}
        >
          Edit
        </a>,
        <a
          onClick={() => {
            setState(
              {
                ...state,
                drawer: true,
                currentRow: record,
              }
            )
          }}
          target="_blank" rel="noopener noreferrer" key="view">
          View
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'delete', name: 'delete' },
          ]}
        />,
      ],
    },
  ];



const updateData = async (value: any) =>{
  console.log("from updateData:");
  console.log(value);
  updateClub({
    ...value,
  }).then((res) => {
    if (res.code == 200) {
      message.success("Update Success");
      actionRef.current?.reload();
    } else {
      message.error("Update Failed");
    }
  });
  setCurrentRow(undefined)
  handleUpdateModalVisible(false);
  }

  return (
    <>
    <ModalForm
    visible={state.updateModalVisible}
    onVisibleChange={handleUpdateModalVisible}
    onFinish={async (value) => {
      const values = {
        ...value,
      }
    await updateData(values);
    }
    }
    >
      <UpdateForm
        onSubmit={async (value) => {
          const values = {
            ...value,
          }
        await updateData(values);
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
        }}
       updateModalVisible={state.updateModalVisible || false}
       values={state.currentRow|| null}/>
    </ModalForm>

      <ModalForm
        title="Create A New Club"
        form={form}
        submitTimeout={1500}
        onFinish={async (values) => {
          const data = {
            clubName: values.name,
            token: cookie.load("Ribo_token")
          }

          newClub(data).then(() => {
            message.success('提交成功');
            setOpen(false);
            actionRef.current?.reload();
            return true;
          });
        }}
        onVisibleChange={setOpen}
        visible={state.open}
      >
        <ProFormText width="md"
                     name="name"
                     label="Club Name" />
      </ModalForm>


      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          return request<{
            data: GithubIssueItem[];
          }>('http://localhost:8080/App/ribo/admin/getClubList',
            {
              data: {
                token: cookie.load("Ribo_token")
              },
              method: 'POST',

              params,
            });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 100,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="Club Management"
        toolBarRender={() => [
          <Button key="button" onClick={() => {
            setOpen(true);
          }} icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1',
                },
                {
                  label: '2nd item',
                  key: '1',
                },
                {
                  label: '3rd item',
                  key: '1',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <Drawer width={640} placement="right" closable={true} onClose={onDrawerClose} open={state.drawer}>
        {!state.drawer ? null : (
          <>
            <h1>{state.currentRow.name}</h1>
            <h3>Description: <Tag color={"blue"}>{state.currentRow.description}</Tag></h3>
            <h3>Club Members: <Tag color={"blue"}>{state.currentRow.number} person</Tag></h3>
            <h3>Club President: <Tag color={"blue"}>{state.currentRow.president}</Tag></h3>
            <h3>Club Create Time: <Tag color={"blue"}>{state.currentRow.time}</Tag></h3>
          </>
        )}
      </Drawer>
    </>

  );
};
