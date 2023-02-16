import {PageLoading, ProColumns, ProTable} from "@ant-design/pro-components";
import {useState} from "react";
import {getClubActivity} from "@/services/login/api";
import {useParams} from "umi";
import {Button} from "antd";


const Activities = () => {
  const param: any = useParams();
  const [state,setState] = useState<{
loading: boolean;
data?: any;
  }>({
    loading: true
  });

  if (state.loading){
    getClubActivity(param.id).then((res) => {
      setState({
        loading: false,
        data: res
      })
    }
    )
    return <PageLoading/>
  }


   type TableItem = {
    aid: string,
    name: string,
    status: string,
    time: string,
  }
  const columns: ProColumns<TableItem>[] = [
    {
      title: '活动ID',
      dataIndex: 'aid',
    },
    {
      title: '活动名称',
      dataIndex: 'activity_name',
    },
    {
      title: '活动状态',
      dataIndex: 'activity_status',
      valueEnum: {
        0: { text: '未开始', status: 'Default' },
        1: { text: '进行中', status: 'Processing' },
        2: { text: '已结束', status: 'Success' },
        3: { text: '已取消', status: 'Error' },
      },
      filtered: true,
      filters: true,
      onFilter: true,
    },
    {
      title: '活动时间',
      dataIndex: 'activity_time',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) =>{
        return(
          <a
            onClick={() => {
              console.log(record);
            }}
            >Edit</a>
        )
      }
    }];
  return (
        <div>
          <ProTable<TableItem>
            columns={columns}
            search={false}
            dataSource={state.data || []}
            toolbar={
              {
                actions: [
                  <Button
                    key="primary"
                    type="primary"
                    onClick={() => {
                      alert('add');
                    }}
                  >
                    添加
                  </Button>,
                ],
              }
            }
          />
        </div>
  );
}
export default Activities;
