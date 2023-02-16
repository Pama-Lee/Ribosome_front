import {useState} from "react";
import {Card, Tabs} from "antd";
import Settings from "@/pages/club/Manager/Settings";
import Activities from "@/pages/club/Manager/Activities";
import Members from "@/pages/club/Manager/Members";
import Announcement from "@/pages/club/Manager/Announcement";
import Material from "@/pages/club/Manager/Material";

const Manager = () => {
  const [state, setState] = useState({});
  return (
    <>
      <Card>
        <Tabs
          defaultActiveKey="1"
          tabPosition={'left'}
          items={[
            {
              key: '1',
              label: '社团信息',
              children: <Settings/>,
            },
            {
              key: '2',
              label: '社团活动',
              children: <Activities/>,
            },
            {
              key: '3',
              label: '社团成员',
              children: <Members/>,
            }
            ,{
              key: '4',
              label: '社团公告',
              children: <Announcement/>,
            },{
            key: '5',
            label: '物料管理',
              children: <Material/>
            }
            ]}
        />
      </Card>

    </>
  )
}

export default Manager;
