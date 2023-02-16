import {ProColumns, ProTable} from "@ant-design/pro-components";
import {useState} from "react";
import {getClubApplicationListAdmin, handleApplication} from "@/services/login/api";
import {Button, message, Popconfirm} from "antd";
import {useParams} from "umi";
import cookie from "react-cookies";

const Application = () => {
  const param: any = useParams();
  const [state,setState] = useState<{
    loading: boolean;
    data?: any;
    currentRow?: any;
    showConfirm?: boolean;
    configWhat?: string;
  }>({
    loading: true,
  });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      const status = (state.configWhat === "agree") ? "1" : "2";
      handleApplication({
        cid: param.id,
        token: cookie.load("Ribo_token"),
        aid: state.currentRow?.aid,
        status: status
      }).then((res) => {
        if (res.code === 200 || res.code === '200' || res.message === 'success' || res.message === 'Success') {
          message.success("操作成功")
          setState({
            ...state,
            showConfirm: false,
            currentRow: undefined,
            configWhat: undefined
          })
        }else {
          message.error("操作失败")
          setState({
            ...state,
            showConfirm: false,
            currentRow: undefined,
            configWhat: undefined
          })
        }
        setConfirmLoading(false)
      });
    }, 1000);
  }

  const handleCancel = () => {
    setState({
      ...state,
      showConfirm: false
    })
  }

  type TableItem = {
    aid: string,
    name: string,
    status: string,
    time: string,
  }
  const columns: ProColumns<TableItem>[] = [
    {
      title: '申请ID',
      dataIndex: 'aid',
    },
    {
      title: '申请人',
      dataIndex: 'username',
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '未处理', status: 'Default' },
        1: { text: '已同意', status: 'Success' },
        2: { text: '已拒绝', status: 'Error' },
      },
      filtered: true,
      filters: true,
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
    },{
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: any) =>{
        return(
          <>
            <Popconfirm
              title={"确认对"+record.username+"的申请进行处理？"}
              open={state.showConfirm}
              onConfirm={handleOk}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={handleCancel}
            >
              <Button type={"primary"} onClick={
                () => {
                  setState({
                    ...state,
                    showConfirm: true,
                    configWhat: "agree",
                    currentRow: record
                  })
                }
              }>同意</Button>
              <Button onClick={
                () => {
                  setState({
                    ...state,
                    showConfirm: true,
                    configWhat: "refuse",
                    currentRow: record
                  })
                }
              }>拒绝</Button>
            </Popconfirm>

          </>
        )
      }
    }
    ]

  if (state.loading){
    getClubApplicationListAdmin(param.id).then((res) => {
      setState({
        loading: false,
        data: res.data
      });
    }
    )
    return <div>loading</div>
  }

  return (
    <>
      <h1>Application</h1>
      <ProTable<TableItem>
        columns={columns}
        search={false}
        dataSource={state?.data || []}
      />
    </>
  );
};

export default Application;
