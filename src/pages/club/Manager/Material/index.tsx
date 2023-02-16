import {Tabs} from "antd";
import Classroom from "@/pages/club/Manager/Material/Classroom";

const Material = () => {
  return (
    <div>
     <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        items={[
          {
            key: '1',
            label: 'Classroom',
            children: <Classroom/>,
          },{
            key: '2',
            label: 'Equipment',
            children: <h1>Equipment</h1>,
          }
          ]
          }
        />
    </div>
  )
}
export default Material;
