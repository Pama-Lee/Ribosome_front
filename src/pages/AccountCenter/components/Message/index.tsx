import {useRequest} from "@@/plugin-request/request";
import {getUserMessageList} from "@/services/login/api";
import {ProTable} from "@ant-design/pro-components";
import cookie from "react-cookies";
import useModal from "antd/es/modal/useModal";
import {useModel} from "@@/plugin-model/useModel";


let datas: API.UserMessage[] = [];

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  },{
    title: '时间',
    dataIndex: 'time',
  },{
    title: '状态',
    dataIndex: 'status',
    valueEnum: {
      0: { text: '未读', status: 'Error' },
      1: { text: '已读', status: 'Success' },
    }
  }
]

function MessageTable(list?: any){
  return(
    <ProTable
      dataSource={datas}
      columns={columns}
      search={false}
    />
)

}

const Message = () => {

  const { initialState, setInitialState } = useModel('@@initialState');
  const { data: list } = useRequest(()=>{
    setInitialState({
      ...initialState,
      messageCount: undefined
    });
    return getUserMessageList({
      token: cookie.load("Ribo_token"),
    });
  })
  //@ts-ignore
  datas = list;
  return (
    <div>
      <MessageTable list={list}/>
    </div>
  );
};

export default Message;
