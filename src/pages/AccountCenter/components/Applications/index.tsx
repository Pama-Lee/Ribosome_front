import {useRequest} from "@@/plugin-request/request";
import {getClubApplicationList, getUserMessageList} from "@/services/login/api";
import {ProTable} from "@ant-design/pro-components";
import cookie from "react-cookies";

let datas: API.ClubApplication[] = [];

const columns = [
  {
    title: '社团',
    dataIndex: 'clubName',
  },
  {
    title: '是否通过',
    dataIndex: 'status',
    valueEnum: {
      0: { text: '未审核', status: 'Default' },
      1: { text: '通过', status: 'Success' },
      2: { text: '未通过', status: 'Error' },
    }}
  ,{
      title: '上次处理时间',
      dataIndex: 'approvedTime',
  }
]

function MessageTable(list?: any){
  return(
    <ProTable
      dataSource={datas||[]}
      columns={columns}
      search={false}
    />
  )

}

const Applications = () => {

  const { data: list } = useRequest(()=>{
    return getClubApplicationList( cookie.load("Ribo_token"));
  })
  //@ts-ignore
  datas = list;
  return (
    <div>
      <MessageTable list={datas||[]}/>
    </div>
  );
};

export default Applications;
