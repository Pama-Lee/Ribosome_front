import {PageLoading, ProColumns, ProTable} from "@ant-design/pro-components";
import Styles from './index.less';
import {useState} from "react";
import {getClubList} from "@/services/login/api";

const columns: ProColumns<API.ClubInfo>[] = [
  {
    title: '社团名称',
    dataIndex: 'club_name',
  },{
  title: '社团人数',
  dataIndex: 'club_member_count',
  },{
  title: '社团主席',
dataIndex: 'club_president',
  }
]

let data: API.ClubInfo[];

function ClubListTable(){
  return(
    <ProTable
      columns={columns}
      search={false}
      dataSource={data}
      />
  )

}



const ClubList = () => {
  const [state,setState] = useState<{
    loading: boolean;
  }>({
    loading: true
  });
  if (state.loading){
    getClubList().then((res) => {
      data = res;
      setState({
        loading: false,
      })
    })
    return <PageLoading/>
  }

    return(
      <div>
        <h1 className={Styles.Title}>Club List</h1>
        <ClubListTable/>
      </div>
    )
}

export default ClubList;
