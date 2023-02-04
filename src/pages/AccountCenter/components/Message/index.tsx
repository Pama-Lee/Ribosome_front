import {useRequest} from "@@/plugin-request/request";
import {getUserMessageList} from "@/services/login/api";
import {ProTable} from "@ant-design/pro-components";


let datas: API.UserMessage[] = [];

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
  }
]

function MessageTable(list?: any){
  console.log(list.list)
  return(
    <ProTable
      dataSource={datas}
      columns={columns}
      search={false}
    />
)

}

const Message = () => {

  const { data: list } = useRequest(()=>{
    return getUserMessageList({
      uid: "1",
      token: '123'
    });
  })
  //@ts-ignore
  datas = list?.list;
  return (
    <div>
      <MessageTable list={list}/>
    </div>
  );
};

export default Message;
