import {Tabs} from "antd";
import Application from "@/pages/club/Manager/Members/pages/Application";
import MembersSub from "@/pages/club/Manager/Members/pages/Members";
import Role from "@/pages/club/Manager/Members/pages/Role";

const Members = () => {

  return(
    <>
      <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        items={[
          {
            key: '1',
            label: 'Application',
            children: <Application />,
          },
          {
            key: '2',
            label: 'Members',
            children: <MembersSub />,
          },
          {
            key: '3',
            label: 'Role',
            children: <Role />,
          }
        ]}
      />
    </>
  )
}
export default Members;
